/**
 * Meta (Facebook) Pixel Helper Utility
 * Allows dynamic initialization via Pixel ID and safe tracking of standard e-commerce events.
 */

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export const initFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined' || !pixelId) return;

  // Clean pixel ID
  const cleanId = pixelId.trim();
  if (!cleanId) return;

  // Check if fbq script already exists
  if (!window.fbq) {
    const f: any = (window.fbq = function () {
      if (f.callMethod) {
        f.callMethod.apply(f, arguments);
      } else {
        f.queue.push(arguments);
      }
    });
    if (!window._fbq) window._fbq = f;
    f.push = f;
    f.loaded = true;
    f.version = '2.0';
    f.queue = [];

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  try {
    window.fbq('init', cleanId);
    window.fbq('track', 'PageView');
    console.log(`[Meta Pixel] Initialized with ID: ${cleanId}`);
  } catch (err) {
    console.warn('[Meta Pixel] Failed to track PageView:', err);
  }
};

export const trackPixelEvent = (
  eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Contact',
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
      console.log(`[Meta Pixel] Tracked: ${eventName}`, params || '');
    } catch (err) {
      console.warn(`[Meta Pixel] Error tracking ${eventName}:`, err);
    }
  }
};
