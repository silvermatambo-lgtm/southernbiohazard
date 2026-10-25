import { useEffect, useState } from 'react';
import { site } from '../config/site';
export default function LoadingScreen(){
 const [visible,setVisible]=useState(true);
 useEffect(()=>{const timeout=setTimeout(()=>setVisible(false),350);return ()=>clearTimeout(timeout);},[]);
 if(!visible)return null;
 return <div aria-hidden="true" className="fixed z-[100] inset-0 bg-slate-950 flex flex-col items-center justify-center pointer-events-none"><img src={site.brand.logo} alt="" className="h-20 w-20 animate-scale-in"/><span className="text-white text-sm tracking-widest mt-5 font-display">{site.brand.shortName}</span></div>;
}
