import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Analytics() {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    // Simple local analytics - track page views in localStorage
    const trackLocalVisit = () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const visitKey = `portfolio_visits_${today}`;
        const currentVisits = parseInt(localStorage.getItem(visitKey) || '0');
        localStorage.setItem(visitKey, (currentVisits + 1).toString());
        
        // Keep only last 30 days of data
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        // Clean up old visit data
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith('portfolio_visits_')) {
            const dateStr = key.replace('portfolio_visits_', '');
            const date = new Date(dateStr);
            if (date < thirtyDaysAgo) {
              localStorage.removeItem(key);
            }
          }
        }
      } catch (error) {
        // Silently fail if localStorage is not available
      }
    };

    // Track visit locally immediately
    trackLocalVisit();

    // Try to connect to backend for enhanced analytics (optional)
    const checkBackend = async () => {
      if (!projectId || !publicAnonKey) {
        return; // Silently continue with local analytics only
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // Shorter timeout

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-dd443446/health`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (response.ok) {
          setBackendReady(true);
          // Silently enable enhanced analytics
        }
      } catch (error) {
        // Silently continue with local analytics only
      }
    };

    // Check backend availability without blocking
    setTimeout(checkBackend, 1000); // Delay to not block initial page load
  }, []);

  useEffect(() => {
    if (!backendReady) return;

    // Enhanced backend analytics when available
    const trackEnhancedVisit = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dd443446/analytics/visit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
      } catch (error) {
        // Silently fail - enhanced analytics is optional
      }
    };

    // Track enhanced visit
    trackEnhancedVisit();

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if (scrollDepth >= 25 && scrollDepth < 50 && maxScrollDepth < 25) {
          console.log('User scrolled to 25%');
        } else if (scrollDepth >= 50 && scrollDepth < 75 && maxScrollDepth < 50) {
          console.log('User scrolled to 50%');
        } else if (scrollDepth >= 75 && scrollDepth < 100 && maxScrollDepth < 75) {
          console.log('User scrolled to 75%');
        } else if (scrollDepth >= 100 && maxScrollDepth < 100) {
          console.log('User scrolled to 100%');
        }
      }
    };

    // Track section views
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            console.log(`Section viewed: ${sectionId}`);
            // You could track specific section views here
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Add scroll listener
    window.addEventListener('scroll', trackScrollDepth);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything
  return null;
}