import raw from '../../site.config.json';

type Config = Omit<typeof raw, 'testimonials'> & {testimonials: Array<{ name: string; quote: string; context: string }>};
export const site = raw as Config;
export const hasPhone = Boolean(site.contact.phone.trim());
export const hasWhatsApp = /^\d{8,15}$/.test(site.contact.whatsapp.replace(/\D/g, ''));
export const whatsAppNumber = site.contact.whatsapp.replace(/\D/g, '');
export const telephone = site.contact.phone.replace(/[^+\d]/g, '');
export const whatsappHref = (message = `Hello ${site.brand.name}, I would like to enquire.`) =>
  hasWhatsApp ? `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}` : '';
export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  ...(site.features.showGallery ? [{ to: '/gallery', label: 'Gallery' }] : []),
  { to: '/faq', label: 'FAQ' },
  ...(site.features.showTestimonials && site.testimonials.length ? [{ to: '/testimonials', label: 'Testimonials' }] : []),
  { to: '/contact', label: 'Contact' },
];
