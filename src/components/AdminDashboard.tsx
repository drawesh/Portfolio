import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Mail, 
  BarChart3, 
  Users, 
  Eye, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2 
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied';
}

interface Analytics {
  date: string;
  visits: number;
}

interface AnalyticsData {
  analytics: Analytics[];
  summary: {
    totalVisits: number;
    totalContacts: number;
    avgVisitsPerDay: number;
  };
}

export function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'analytics'>('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Check if required environment variables are available
      if (!projectId || !publicAnonKey) {
        setError('Service configuration unavailable');
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        // Fetch contacts
        const contactsResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-dd443446/admin/contacts`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            signal: controller.signal,
          }
        );

        if (contactsResponse.ok) {
          const contactsData = await contactsResponse.json();
          setContacts(contactsData.contacts || []);
        } else if (contactsResponse.status !== 401) {
          console.warn('Failed to fetch contacts:', contactsResponse.status);
        }

        // Fetch analytics
        const analyticsResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-dd443446/admin/analytics`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            signal: controller.signal,
          }
        );

        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json();
          setAnalytics(analyticsData);
        } else if (analyticsResponse.status !== 401) {
          console.warn('Failed to fetch analytics:', analyticsResponse.status);
        }

        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }

    } catch (err) {
      console.error('Error fetching admin data:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please check your connection and try again.');
        } else {
          setError('Failed to load dashboard data. Service may be unavailable.');
        }
      } else {
        setError('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId: string, status: string) => {
    if (!projectId || !publicAnonKey) {
      console.warn('Service configuration unavailable');
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dd443446/admin/contacts/${contactId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ status }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact.id === contactId ? { ...contact, status: status as any } : contact
        ));
      } else {
        console.warn('Failed to update contact status:', response.status);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.warn('Update contact status request timed out');
      } else {
        console.error('Error updating contact status:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="mb-2">Error Loading Dashboard</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchData}>Try Again</Button>
        </Card>
      </div>
    );
  }

  const newContacts = contacts.filter(c => c.status === 'new').length;
  const recentContacts = contacts.slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2">Portfolio Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your portfolio performance and manage inquiries
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'contacts', label: 'Contacts', icon: Mail },
            { id: 'analytics', label: 'Analytics', icon: Eye },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.id === 'contacts' && newContacts > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {newContacts}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {analytics?.summary.totalVisits || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Visits</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{contacts.length}</p>
                    <p className="text-sm text-muted-foreground">Total Contacts</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{newContacts}</p>
                    <p className="text-sm text-muted-foreground">New Messages</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {Math.round(analytics?.summary.avgVisitsPerDay || 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Daily Visits</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Contacts */}
            <Card className="p-6">
              <h3 className="mb-4 flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Recent Messages</span>
              </h3>
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(contact.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={contact.status === 'new' ? 'destructive' : 'secondary'}>
                      {contact.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {contacts.map((contact) => (
              <Card key={contact.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={contact.status === 'new' ? 'destructive' : 'secondary'}>
                      {contact.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {new Date(contact.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <h5 className="mb-2">{contact.subject}</h5>
                <p className="text-muted-foreground mb-4">{contact.message}</p>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateContactStatus(contact.id, 'read')}
                    disabled={contact.status === 'read'}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateContactStatus(contact.id, 'replied')}
                    disabled={contact.status === 'replied'}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Mark as Replied
                  </Button>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="mb-4">Daily Visits (Last 30 Days)</h3>
              <div className="h-64 flex items-end space-x-1">
                {analytics.analytics.map((day, index) => (
                  <div
                    key={day.date}
                    className="flex-1 bg-primary/20 rounded-t-sm min-h-[4px] relative group"
                    style={{
                      height: `${Math.max(4, (day.visits / Math.max(...analytics.analytics.map(d => d.visits))) * 240)}px`
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.visits} visits<br />
                      {new Date(day.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}