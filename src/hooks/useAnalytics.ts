import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '@/lib/analytics';

/**
 * Initialises analytics on mount, then tracks SPA page views
 * on every route change.  Use once in your App/layout component.
 */
export function useAnalytics() {
  const location = useLocation();

  // One-time init
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track SPA navigation
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
}
