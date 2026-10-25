import { useState } from 'react';
import { Droplets, HeartHandshake, Building2, ArrowRight, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
const items = [
 {Icon:HeartHandshake,number:'01',title:'Trauma & postmortem',lead:'Discreet support when it matters most.',body:'Careful, respectful biohazard and postmortem cleaning. Every enquiry is handled with compassion.',link:'Ask for specialist help'},
 {Icon:Droplets,number:'02',title:'High-pressure cleaning',lead:'Restore your exterior surfaces.',body:'Pressure-washing solutions for driveways, walls, roofs, workshops, forecourts and more.',link:'Discuss a cleaning job'},
 {Icon:Building2,number:'03',title:'Property support',lead:'Ready for the next chapter.',body:'Property turnover cleaning, move-in and move-out services, maintenance and trash-out support.',link:'Get property support'},
];
export default function FlipServices(){
 const [active,setActive]=useState<number[]>([]);
 const toggle=(i:number)=>setActive(a=>a.includes(i)?a.filter(v=>v!==i):[...a,i]);
 return <section className="py-20 md:py-24 bg-[#07110e] text-white overflow-hidden"><div className="container-site">
 <div className="max-w-2xl text-center mx-auto"><p className="eyebrow text-accent">HOW WE HELP</p><h2 className="section-heading !text-white mt-4">Specialised care. Practical solutions.</h2><p className="text-slate-300 mt-5">Tap or hover on a card to discover the difference.</p></div>
 <div className="grid sm:grid-cols-3 gap-6 mt-12">{items.map((item,i)=><div key={item.number} className={`flip-scene ${active.includes(i)?'is-flipped':''}`}>
 <div className="flip-inner"><div className="flip-face flip-front"><span className="text-accent text-sm tracking-widest font-bold">{item.number} / SERVICE</span><item.Icon size={44} className="mt-8 mb-7 text-accent"/><h3 className="text-2xl font-bold">{item.title}</h3><p className="text-slate-300 mt-4">{item.lead}</p><button onClick={()=>toggle(i)} aria-label={`Learn more about ${item.title}`} className="flip-action mt-auto">Discover more <RotateCw size={16}/></button></div>
 <div className="flip-face flip-back"><span className="text-accent font-bold tracking-wider text-xs">SOUTHERN BIOHAZARD</span><h3 className="text-2xl font-bold mt-8">{item.title}</h3><p className="text-slate-200 leading-relaxed mt-5">{item.body}</p><Link to="/contact" className="inline-flex gap-2 text-[#b8ff4c] font-bold items-center mt-7">{item.link}<ArrowRight size={16}/></Link><button onClick={()=>toggle(i)} className="flip-action mt-auto">Flip back <RotateCw size={16}/></button></div></div></div>)}</div>
 </div></section>;
}
