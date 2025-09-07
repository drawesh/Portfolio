import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkBackend = async () => {
      if (!projectId || !publicAnonKey) {
        setStatus('offline');
        console.warn('Missing Supabase configuration');
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          console.warn('Backend health check timed out after 10 seconds');
        }, 10000); // Increased timeout to 10 seconds

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-dd443446/health`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setStatus('online');
          console.log('Backend is online:', data);
        } else {
          setStatus('offline');
          console.warn('Backend health check failed:', response.status, response.statusText);
          const errorText = await response.text().catch(() => 'Unable to read error response');
          console.warn('Error response:', errorText);
        }
      } catch (error) {
        setStatus('offline');
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.warn('Backend health check was aborted (timeout or manual abort)');
          } else {
            console.warn('Backend health check error:', error.message);
          }
        } else {
          console.warn('Backend health check failed with unknown error:', error);
        }
      }
    };

    // Check immediately but with a small delay to let the app settle
    const initialCheckTimer = setTimeout(checkBackend, 1000);

    // Check every 60 seconds instead of 30 to reduce load
    const interval = setInterval(checkBackend, 60000);

    return () => {
      clearTimeout(initialCheckTimer);
      clearInterval(interval);
    };
  }, []);

  // Only show status indicator in development mode or when there are persistent issues
  const showStatus = process.env.NODE_ENV === 'development' && status === 'checking';

  if (!showStatus) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg text-xs flex items-center space-x-2 transition-all duration-300 ${
        status === 'online' 
          ? 'bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 opacity-60'
          : status === 'offline'
          ? 'bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
          : 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${
          status === 'online' 
            ? 'bg-green-500'
            : status === 'offline'
            ? 'bg-orange-500'
            : 'bg-blue-500'
        }`} />
        <span>
          {status === 'checking' ? 'Initializing enhanced features...' : 
           status === 'online' ? 'All features ready' : 
           'Running in offline mode'}
        </span>
      </div>
    </div>
  );
}