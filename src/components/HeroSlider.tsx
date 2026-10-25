import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../config/site';
import Typewriter from './Typewriter';
const duration = 6500;
export default function HeroSlider(){
 const slides=site.heroSlides;
 const [current,setCurrent]=useState(0);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{if(paused||slides.length<2)return;const timer=window.setInterval(()=>setCurrent(i=>(i+1)%slides.length),duration);return ()=>window.clearInterval(timer);},[slides.length,paused]);
 const prev=()=>setCurrent(i=>(i-1+slides.length)%slides.length);
 const next=()=>setCurrent(i=>(i+1)%slides.length);
 const slide=slides[current];
 return <section aria-label="Featured services" className="relative min-h-[670px] h-[min(850px,95dvh)] overflow-hidden bg-slate-950 text-white">
   {slides.map((s,i)=><div key={s.image+i} className={`absolute inset-0 transition-opacity duration-1000 ${i===current?'opacity-100':'opacity-0'}`} aria-hidden={i!==current}><img src={s.image} alt="" className="w-full h-full object-cover" fetchPriority={i===0?'high':'auto'} /></div>)}
   <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25"/>
   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"/>
   <div className="relative container-site h-full flex items-center pt-16 pb-28"><div className="max-w-2xl" key={current}>
      <p className="eyebrow text-accent animate-fade-up">{slide.eyebrow}</p>
      <h1 className="mt-5 text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.08] animate-slide-left"><Typewriter text={slide.heading}/><span className="block text-accent mt-2"><Typewriter text={slide.highlight}/></span></h1>
      <p className="max-w-xl mt-6 text-lg text-slate-200 leading-relaxed animate-fade-up">{slide.description}</p>
      <div className="flex flex-wrap gap-3 mt-8 animate-fade-up"><Link to="/services" className="btn-primary">Explore Services <ArrowRight size={17}/></Link><Link to="/contact" className="btn-outline">Get in touch</Link></div>
   </div></div>
   <div className="absolute bottom-24 md:bottom-10 inset-x-0"><div className="container-site flex items-center justify-between gap-4"><div className="flex gap-2">{slides.map((s,i)=><button type="button" key={s.heading+i} onClick={()=>setCurrent(i)} aria-label={`Go to slide ${i+1}`} aria-current={i===current?'true':undefined} className={`h-2 rounded-full transition-all ${i===current?'w-10 bg-accent':'w-4 bg-white/50 hover:bg-white'}`}/>)}</div><div className="flex items-center gap-2"><button type="button" aria-label={paused?'Play slider':'Pause slider'} onClick={()=>setPaused(v=>!v)} className="slider-control">{paused?<Play size={18}/>:<Pause size={18}/>}</button><button type="button" aria-label="Previous slide" onClick={prev} className="slider-control"><ChevronLeft size={19}/></button><button type="button" aria-label="Next slide" onClick={next} className="slider-control"><ChevronRight size={19}/></button></div></div></div>
 </section>;
}
