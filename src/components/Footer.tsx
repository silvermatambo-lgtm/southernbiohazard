import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, Clock3, Globe2, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import Brand from './Brand';
import { hasPhone, hasWhatsApp, navLinks, site, telephone, whatsappHref } from '../config/site';
const socials = [
 {label:'Facebook',href:site.social.facebook,Icon:Facebook},
 {label:'Instagram',href:site.social.instagram,Icon:Instagram},
 {label:'YouTube',href:site.social.youtube,Icon:Youtube},
 {label:'LinkedIn',href:site.social.linkedin,Icon:Linkedin},
];
export default function Footer(){
 return <footer className="bg-slate-950 text-slate-300 pb-16 md:pb-0">
   <div className="container-site pt-16 pb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
    <div className="lg:col-span-2 max-w-sm"><Link to="/" className="inline-flex mb-5"><Brand/></Link><p className="text-slate-400 leading-relaxed text-sm">{site.brand.description}</p><div className="flex gap-3 mt-6">{socials.filter(s=>s.href).map(({label,href,Icon})=><a aria-label={label} key={label} href={href} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20"><Icon size={18}/></a>)}</div></div>
    <div><h3 className="text-white font-display font-bold text-lg mb-5">Explore</h3><div className="grid gap-3">{navLinks.map(l=><Link to={l.to} key={l.to} className="hover:text-accent text-sm">{l.label}</Link>)}</div></div>
    <div><h3 className="text-white font-display font-bold text-lg mb-5">Get in touch</h3><div className="space-y-4 text-sm text-slate-400">{hasPhone&&<a className="flex gap-3 hover:text-white" href={`tel:${telephone}`}><Phone size={18} className="text-accent shrink-0"/>{site.contact.phone}</a>}{site.contact.email&&<a className="flex gap-3 hover:text-white break-all" href={`mailto:${site.contact.email}`}><Mail size={18} className="text-accent shrink-0"/>{site.contact.email}</a>}{site.contact.website&&<a className="flex gap-3 hover:text-white break-all" href={site.contact.website} target="_blank" rel="noopener noreferrer"><Globe2 size={18} className="text-accent shrink-0"/>{site.contact.website.replace(/^https?:\/\//,'')}</a>}{site.contact.address&&<p className="flex gap-3"><MapPin size={18} className="text-accent shrink-0"/>{site.contact.address}</p>}<p className="flex gap-3"><Clock3 size={18} className="text-accent shrink-0"/>{site.contact.hours}</p>{hasWhatsApp&&<a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300">Chat on WhatsApp <ArrowRight size={16}/></a>}{!hasPhone&&!site.contact.email&&!hasWhatsApp&&<Link to="/contact" className="text-accent">Contact information pending client setup</Link>}</div></div>
   </div>
   <div className="border-t border-white/10"><div className="container-site py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500"><p>© {new Date().getFullYear()} {site.brand.name}. All rights reserved.</p><p>Website designed by <a href="https://webdevpro.co.za" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">WebDevPro</a> · <a className="text-slate-300 hover:text-white" href="https://webdevpro.co.za">webdevpro.co.za</a></p></div></div>
 </footer>;
}
