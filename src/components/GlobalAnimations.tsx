import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function GlobalAnimations(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)return;
  const targets=Array.from(document.querySelectorAll('main h1, main h2, main h3, main p:not(.eyebrow)'));
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target);}})},{threshold:.10,rootMargin:'0px 0px 20px 0px'});
  targets.forEach(el=>{el.classList.add(el.tagName==='P'?'motion-desc':'motion-heading');io.observe(el);});
  return ()=>io.disconnect();
 },[pathname]);
 return null;
}
