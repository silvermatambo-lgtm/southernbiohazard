import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { site } from '../config/site';
interface InstallEvent extends Event { prompt:()=>Promise<void>; userChoice:Promise<{outcome:'accepted'|'dismissed'}> }
export default function PWAInstall(){
 const [prompt,setPrompt]=useState<InstallEvent|null>(null);
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  if(!site.features.pwaEnabled || !site.features.showInstallPrompt) return;
  const handle=(event:Event)=>{event.preventDefault();setPrompt(event as InstallEvent);setVisible(true);};
  const installed=()=>setVisible(false);
  window.addEventListener('beforeinstallprompt',handle);window.addEventListener('appinstalled',installed);
  return ()=>{window.removeEventListener('beforeinstallprompt',handle);window.removeEventListener('appinstalled',installed);};
 },[]);
 if(!visible||!prompt)return null;
 const install=async()=>{try{await prompt.prompt();await prompt.userChoice;}finally{setPrompt(null);setVisible(false);}};
 return <aside aria-label="Install this website" className="fixed bottom-[88px] md:bottom-7 left-4 z-[43] w-[min(310px,calc(100vw-2rem))] rounded-2xl bg-white border shadow-xl overflow-hidden animate-fade-up"><div className="h-1 bg-accent"/><div className="p-4"><button onClick={()=>setVisible(false)} aria-label="Dismiss install prompt" className="absolute right-3 top-3 p-2 rounded-lg bg-slate-100"><X size={15}/></button><div className="flex gap-3 items-center pr-6"><img alt="" className="h-12 w-12 rounded-xl" src={site.pwa.icon192}/><div><p className="font-bold text-sm">{site.brand.name}</p><p className="text-xs text-slate-500">Add to your device</p></div></div><p className="text-sm text-slate-600 my-4">Install for quick access to {site.brand.shortName}.</p><button className="btn-primary w-full justify-center" type="button" onClick={install}><Download size={16}/> Install app</button></div></aside>;
}
