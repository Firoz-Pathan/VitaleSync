'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Default to false for server-side rendering
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Browser check for SSR
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      // Set the initial value
      setMatches(media.matches);

      // Define listener function
      const listener = () => setMatches(media.matches);
      // Add the listener
      media.addEventListener('change', listener);
      
      // Clean up
      return () => media.removeEventListener('change', listener);
    }
    
    // Return empty cleanup function if not in browser
    return () => {};
  }, [query]);

  return matches;
}

export default useMediaQuery; 