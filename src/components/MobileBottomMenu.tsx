import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Images, Mail } from 'lucide-react';
import { site } from '../config/site';
export default function MobileBottomMenu(){
 const {pathname}=useLocation();
 const links=[{to:'/',label:'Home',Icon:Home},{to:'/services',label:'Services',Icon:Briefcase},...(site.features.showGallery?[{to:'/gallery',label:'Gallery',Icon:Images}]:[]),{to:'/contact',label:'Contact',Icon:Mail}];
 return <nav aria-label="Quick mobile navigation" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950 text-slate-300 border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-2xl"><div className="flex items-center justify-around max-w-xl mx-auto">{links.map(({to,label,Icon})=><Link to={to} key={to} aria-current={pathname===to?'page':undefined} className={`flex min-w-0 flex-1 items-center flex-col gap-1 py-3 text-[11px] font-medium ${pathname===to?'text-accent':'hover:text-white'}`}><Icon size={21}/>{label}</Link>)}</div></nav>;
}
