import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle, Send, X } from 'lucide-react';
import { hasWhatsApp, site, whatsappHref } from '../config/site';
type Step='welcome'|'name'|'phone'|'service'|'message'|'review';
const steps:Step[]=['welcome','name','phone','service','message','review'];
export default function FloatingWhatsApp(){
 const [open,setOpen]=useState(false);
 const [step,setStep]=useState<Step>('welcome');
 const [data,setData]=useState({name:'',phone:'',service:'',message:''});
 const services=useMemo(()=>['General enquiry','Request a quote',...site.services.map(s=>s.name),'Other'],[]);
 const canContinue=step==='name'?data.name.trim().length>=2:step==='phone'?data.phone.replace(/\D/g,'').length>=8:step==='service'?!!data.service:step==='message'?data.message.trim().length>=4:true;
 const next=()=>setStep(s=>steps[Math.min(steps.indexOf(s)+1,steps.length-1)]);
 const back=()=>setStep(s=>steps[Math.max(steps.indexOf(s)-1,0)]);
 const send=()=>{if(!hasWhatsApp)return;const message=`Hello ${site.brand.name}, please assist me.

Name: ${data.name}
Phone: ${data.phone}
Enquiry: ${data.service}
Details: ${data.message}`;window.open(whatsappHref(message),'_blank','noopener,noreferrer');setOpen(false);};
 if(!site.features.chatAssistant || !hasWhatsApp)return null;
 return <div className="fixed right-4 bottom-[88px] md:bottom-7 z-[48] flex flex-col items-end">
   {open&&<section role="dialog" aria-label="WhatsApp enquiry assistant" className="mb-3 w-[min(360px,calc(100vw-2rem))] max-h-[calc(100dvh-160px)] rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-fade-up">
    <header className="bg-slate-950 text-white p-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="bg-green-600 rounded-xl p-2"><MessageCircle size={22}/></div><div><p className="font-bold text-sm">{site.brand.shortName}</p><p className="text-[11px] text-slate-300">WhatsApp enquiry assistant</p></div></div><button type="button" aria-label="Close assistant" onClick={()=>setOpen(false)} className="p-2 hover:bg-white/10 rounded-lg"><X size={20}/></button></header>
    <div className="p-5 overflow-y-auto flex-1 min-h-[190px] max-h-[50dvh]">
     {step==='welcome'&&<div className="space-y-3 text-sm text-slate-700"><p className="bg-slate-100 p-4 rounded-2xl">Hello 👋 Welcome to {site.brand.name}. Tell us a little about your enquiry.</p><p className="bg-slate-100 p-4 rounded-2xl">You can review the details before WhatsApp opens. Nothing is sent automatically.</p></div>}
     {step==='name'&&<Field label="What is your name?" value={data.name} onChange={v=>setData(d=>({...d,name:v}))} placeholder="Your name"/>}
     {step==='phone'&&<Field label="What phone number can we contact?" value={data.phone} onChange={v=>setData(d=>({...d,phone:v}))} placeholder="e.g. +27 71 000 0000" type="tel"/>}
     {step==='service'&&<div><p className="text-sm font-semibold mb-3">What can we help you with?</p><div className="space-y-2">{services.map(s=><button type="button" onClick={()=>setData(d=>({...d,service:s}))} key={s} className={`w-full text-left text-sm rounded-xl border p-3 ${data.service===s?'border-amber-600 bg-amber-50':'border-slate-200 hover:bg-slate-50'}`}>{s}</button>)}</div></div>}
     {step==='message'&&<div><label htmlFor="chat-details" className="block text-sm font-semibold mb-3">Tell us what you need.</label><textarea id="chat-details" rows={5} value={data.message} onChange={e=>setData(d=>({...d,message:e.target.value}))} className="form-field resize-none" placeholder="Brief enquiry details..."/></div>}
     {step==='review'&&<div><p className="text-green-700 font-bold flex items-center gap-2 mb-3"><CheckCircle2 size={19}/> Ready to open WhatsApp</p><div className="p-4 rounded-xl bg-slate-100 break-words text-sm space-y-2"><p><strong>Name:</strong> {data.name}</p><p><strong>Phone:</strong> {data.phone}</p><p><strong>Service:</strong> {data.service}</p><p><strong>Message:</strong> {data.message}</p></div><p className="text-xs text-slate-600 mt-3">Tap Continue to open WhatsApp, then press Send there to submit.</p></div>}
    </div>
    <div className="p-3 border-t flex gap-2">{step!=='welcome'&&<button type="button" onClick={back} aria-label="Previous step" className="p-3 rounded-lg border"><ArrowLeft size={18}/></button>}{step==='review'?<button type="button" onClick={send} className="btn-primary flex-1 justify-center"><Send size={16}/> Continue on WhatsApp</button>:<button type="button" onClick={next} disabled={!canContinue} className="btn-primary flex-1 justify-center disabled:opacity-40">{step==='welcome'?'Start enquiry':'Continue'}</button>}</div>
   </section>}
   <button type="button" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close WhatsApp assistant':'Open WhatsApp assistant'} aria-expanded={open} className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 text-white shadow-xl flex items-center justify-center border-2 border-white/20 transition-transform hover:-translate-y-1">{open?<X size={26}/>:<MessageCircle size={28}/>}</button>
 </div>;
}
function Field({label,value,onChange,placeholder,type='text'}:{label:string;value:string;onChange:(value:string)=>void;placeholder:string;type?:string}){
 return <div><label htmlFor={`field-${type}`} className="block mb-2 text-sm font-semibold">{label}</label><input id={`field-${type}`} className="form-field" type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} autoComplete={type==='tel'?'tel':'name'}/></div>;
}
