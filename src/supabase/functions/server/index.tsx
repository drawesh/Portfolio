import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Simple logging middleware
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
});

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Contact form submission
app.post('/make-server-dd443446/contact', async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();
    
    if (!name || !email || !subject || !message) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    // Store contact submission in KV store
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const contactData = {
      id: contactId,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    await kv.set(contactId, contactData);
    
    // Also store in a list for easy retrieval
    const contacts = await kv.get('contact_submissions') || [];
    contacts.push(contactId);
    await kv.set('contact_submissions', contacts);

    console.log(`Contact form submission received from ${email}: ${subject}`);
    
    return c.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon.',
      id: contactId 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return c.json({ error: 'Failed to process contact form submission' }, 500);
  }
});

// Get all contact submissions (for admin)
app.get('/make-server-dd443446/admin/contacts', async (c) => {
  try {
    // Basic auth check - in production, implement proper authentication
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const contactIds = await kv.get('contact_submissions') || [];
    const contacts = await kv.mget(contactIds);
    
    // Sort by timestamp (newest first)
    contacts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return c.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return c.json({ error: 'Failed to fetch contacts' }, 500);
  }
});

// Update contact status
app.put('/make-server-dd443446/admin/contacts/:id', async (c) => {
  try {
    const contactId = c.req.param('id');
    const { status } = await c.req.json();
    
    const contact = await kv.get(contactId);
    if (!contact) {
      return c.json({ error: 'Contact not found' }, 404);
    }

    contact.status = status;
    contact.updatedAt = new Date().toISOString();
    
    await kv.set(contactId, contact);
    
    return c.json({ success: true, contact });
  } catch (error) {
    console.error('Error updating contact status:', error);
    return c.json({ error: 'Failed to update contact status' }, 500);
  }
});

// Get portfolio projects
app.get('/make-server-dd443446/projects', async (c) => {
  try {
    const projects = await kv.get('portfolio_projects') || [];
    return c.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Add/Update project (admin only)
app.post('/make-server-dd443446/admin/projects', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectData = await c.req.json();
    const projectId = projectData.id || `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const project = {
      ...projectData,
      id: projectId,
      updatedAt: new Date().toISOString()
    };

    // Store individual project
    await kv.set(`project_${projectId}`, project);
    
    // Update projects list
    const projects = await kv.get('portfolio_projects') || [];
    const existingIndex = projects.findIndex((p: any) => p.id === projectId);
    
    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    
    await kv.set('portfolio_projects', projects);
    
    return c.json({ success: true, project });
  } catch (error) {
    console.error('Error saving project:', error);
    return c.json({ error: 'Failed to save project' }, 500);
  }
});

// Delete project (admin only)
app.delete('/make-server-dd443446/admin/projects/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectId = c.req.param('id');
    
    // Remove from individual storage
    await kv.del(`project_${projectId}`);
    
    // Remove from projects list
    const projects = await kv.get('portfolio_projects') || [];
    const updatedProjects = projects.filter((p: any) => p.id !== projectId);
    await kv.set('portfolio_projects', updatedProjects);
    
    return c.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// Analytics endpoints
app.post('/make-server-dd443446/analytics/visit', async (c) => {
  try {
    const { page, userAgent, referrer } = await c.req.json();
    
    const visitId = `visit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const visitData = {
      id: visitId,
      page: page || '/',
      userAgent: userAgent || '',
      referrer: referrer || '',
      timestamp: new Date().toISOString(),
      ip: c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
    };

    await kv.set(visitId, visitData);
    
    // Update daily visit count
    const today = new Date().toISOString().split('T')[0];
    const dailyKey = `visits_${today}`;
    const dailyVisits = await kv.get(dailyKey) || 0;
    await kv.set(dailyKey, dailyVisits + 1);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error recording visit:', error);
    return c.json({ error: 'Failed to record visit' }, 500);
  }
});

// Get analytics data (admin only)
app.get('/make-server-dd443446/admin/analytics', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get visit data for last 30 days
    const analytics = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const visits = await kv.get(`visits_${dateStr}`) || 0;
      analytics.push({ date: dateStr, visits });
    }
    
    // Get total visits
    const totalVisits = analytics.reduce((sum, day) => sum + day.visits, 0);
    
    // Get total contacts
    const contactIds = await kv.get('contact_submissions') || [];
    const totalContacts = contactIds.length;
    
    return c.json({ 
      analytics,
      summary: {
        totalVisits,
        totalContacts,
        avgVisitsPerDay: totalVisits / 30
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Health check endpoint
app.get('/make-server-dd443446/health', async (c) => {
  try {
    // Test KV store connectivity
    const testKey = 'health_check_test';
    const testValue = Date.now();
    await kv.set(testKey, testValue);
    const retrieved = await kv.get(testKey);
    await kv.del(testKey);
    
    const isKvWorking = retrieved === testValue;
    
    return c.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      services: {
        server: true,
        database: isKvWorking
      },
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return c.json({ 
      status: 'degraded', 
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      services: {
        server: true,
        database: false
      }
    }, 503);
  }
});

Deno.serve(app.fetch);