import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowRight, Clock3, Globe2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { hasPhone, hasWhatsApp, site, telephone, whatsappHref } from '../config/site';
import PageHero from '../components/PageHero';
export default function Contact(){
 const [form,setForm]=useState({name:'',phone:'',email:'',service:'',message:''});
 const [notice,setNotice]=useState('');
 const choices=['General enquiry','Request a quote',...site.services.map(s=>s.name),'Other'];
 const delivery=hasWhatsApp?'whatsapp':site.contact.email?'email':null;
 const change=(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{setForm(f=>({...f,[event.target.name]:event.target.value}));setNotice('');};
 const submit=(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();if(!delivery)return;
  const message=`Hello ${site.brand.name}, I would like to get in touch.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Service: ${form.service}
Message: ${form.message}`;
  if(delivery==='whatsapp')window.open(whatsappHref(message),'_blank','noopener,noreferrer');
  else window.location.href=`mailto:${site.contact.email}?subject=${encodeURIComponent(`Enquiry: ${form.service}`)}&body=${encodeURIComponent(message)}`;
  setNotice(delivery==='whatsapp'?'WhatsApp has been opened. Please press Send in WhatsApp to complete your enquiry.':'Your email app has been opened. Please send your email there to complete your enquiry.');
 };
 const contacts=[
  ...(hasPhone?[{label:'Phone',value:site.contact.phone,href:`tel:${telephone}`,Icon:Phone}]:[]),
  ...(hasWhatsApp?[{label:'WhatsApp',value:site.contact.whatsapp,href:whatsappHref(),Icon:MessageCircle}]:[]),
  ...(site.contact.email?[{label:'Email',value:site.contact.email,href:`mailto:${site.contact.email}`,Icon:Mail}]:[]),
  ...(site.contact.website?[{label:'Website',value:site.contact.website.replace(/^https?:\/\//,''),href:site.contact.website,Icon:Globe2}]:[])
 ];
 return <><PageHero eyebrow="WE'D LOVE TO HEAR FROM YOU" title="Contact Us" subtitle="Tell us what you're looking for and we'll help you get started."/>
 <section className="py-16 bg-white"><div className="container-site">{contacts.length?<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{contacts.map(({label,value,href,Icon})=><a href={href} key={label} target={href.startsWith('https:')?'_blank':undefined} rel={href.startsWith('https:')?'noopener noreferrer':undefined} className="card-base p-6 text-center flex flex-col items-center hover:-translate-y-1"><div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-accent-soft text-accent"><Icon size={22}/></div><p className="uppercase tracking-widest font-bold text-xs text-slate-500 mt-4">{label}</p><p className="text-sm font-semibold mt-2 break-all">{value}</p></a>)}</div>:<div className="text-center bg-amber-50 text-amber-900 border border-amber-200 rounded-2xl p-6">Contact methods will be added when client details are confirmed.</div>}</div></section>
 <section className="py-20 bg-slate-50"><div className="container-site grid lg:grid-cols-2 gap-10 items-start"><div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"><p className="eyebrow text-accent">START A CONVERSATION</p><h2 className="section-heading mt-3 mb-4">Send an enquiry</h2><p className="section-desc text-sm mb-6">{delivery?'Complete the form to prepare your message. You will review and send it in your messaging app.':'Enquiry sending will be available once a verified client contact method is configured.'}</p>
  {notice&&<div role="status" className="mb-6 rounded-xl p-4 bg-green-50 border border-green-200 text-green-800 text-sm">{notice}</div>}
  <form className="space-y-5" onSubmit={submit}><div className="grid sm:grid-cols-2 gap-5"><Field label="Full name" name="name" value={form.name} onChange={change} placeholder="Your name" required/><Field label="Phone" name="phone" type="tel" value={form.phone} onChange={change} placeholder="Your number" required/></div><Field label="Email" name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required/><div><label htmlFor="service" className="block text-sm font-semibold mb-2">Service *</label><select className="form-field" name="service" id="service" required value={form.service} onChange={change}><option value="">Choose a service</option>{choices.map(s=><option key={s} value={s}>{s}</option>)}</select></div><div><label className="block text-sm font-semibold mb-2" htmlFor="message">Your message *</label><textarea id="message" name="message" className="form-field min-h-[140px] resize-y" placeholder="Tell us a little about your enquiry..." required minLength={5} value={form.message} onChange={change}/></div><button className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={!delivery}><Send size={17}/>{delivery==='whatsapp'?'Continue to WhatsApp':delivery==='email'?'Continue to email':'Contact method not configured'}</button>{delivery&&<p className="text-xs text-slate-500 text-center">No message is sent automatically by this website.</p>}</form>
 </div><div className="space-y-7"><div className="bg-slate-950 text-white rounded-3xl p-9"><p className="eyebrow text-accent">LOCATION & HOURS</p><h2 className="font-display font-bold text-3xl mt-4">Let's connect</h2><div className="space-y-5 mt-7"><p className="flex gap-4"><MapPin className="text-accent shrink-0"/><span><strong className="block text-sm">Service area</strong><span className="text-slate-300 text-sm">{site.contact.serviceArea}</span></span></p>{site.contact.address&&<p className="flex gap-4"><MapPin className="text-accent shrink-0"/><span><strong className="block text-sm">Office address</strong><span className="text-slate-300 text-sm">{site.contact.address}</span></span></p>}<p className="flex gap-4"><Clock3 className="text-accent shrink-0"/><span><strong className="block text-sm">Business hours</strong><span className="text-slate-300 text-sm">{site.contact.hours}</span></span></p></div></div><div className="rounded-3xl min-h-[260px] bg-slate-950 text-white border border-slate-800 overflow-hidden">{site.contact.mapEmbedUrl?<iframe title={`${site.brand.name} location map`} src={site.contact.mapEmbedUrl} referrerPolicy="no-referrer-when-downgrade" loading="lazy" className="border-0 w-full h-[320px]" allowFullScreen/>:<div className="min-h-[260px] p-8 flex flex-col justify-center items-center text-center"><MapPin size={36} className="text-accent"/><h3 className="font-display text-xl font-bold mt-4">Location map</h3><p className="text-sm text-slate-500 mt-2">Cape Town and surrounding areas. Call 072 263 3533 to discuss services in other regions.</p></div>}</div></div></div></section></>;
}
function Field({label,name,value,onChange,placeholder,required=false,type='text'}:{label:string;name:string;value:string;onChange:(e:ChangeEvent<HTMLInputElement>)=>void;placeholder:string;required?:boolean;type?:string}){return <div><label htmlFor={name} className="block text-sm font-semibold mb-2">{label}{required?' *':''}</label><input className="form-field" type={type} name={name} id={name} value={value} onChange={onChange} placeholder={placeholder} required={required}/></div>}
