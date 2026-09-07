// Analytics & Conversion Tracking Helper for Google Tag GT-W62BJJT3

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...params,
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }
    }
  } catch (e) {
    console.warn('Analytics tracking error:', e);
  }
}

export function trackPhoneCall(source: string = 'general') {
  trackEvent('click_to_call', {
    event_category: 'Contact',
    event_label: source,
    value: 1,
  });
}

export function trackWhatsAppClick(source: string = 'general') {
  trackEvent('whatsapp_click', {
    event_category: 'Contact',
    event_label: source,
    value: 1,
  });
}

export function trackBookingSubmit(bookingType: string, details: Record<string, unknown> = {}) {
  trackEvent('generate_lead', {
    event_category: 'Booking',
    event_label: bookingType,
    ...details,
  });
}
