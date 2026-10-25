import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks } from '../config/site';
import Brand from './Brand';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { const update = () => setScrolled(window.scrollY > 35); update(); window.addEventListener('scroll', update, { passive:true }); return () => window.removeEventListener('scroll',update); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; },[open]);
  return <>
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || pathname !== '/' ? 'bg-slate-950/95 shadow-xl py-3 backdrop-blur-md':'bg-slate-950/40 py-4 backdrop-blur-sm'}`}>
      <div className="container-site flex items-center justify-between gap-6">
        <Link to="/" aria-label="Go to home page" className="shrink min-w-0"><Brand /></Link>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(l => <Link key={l.to} to={l.to} aria-current={pathname===l.to?'page':undefined} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${pathname===l.to?'text-accent bg-white/10':'text-white/85 hover:text-white hover:bg-white/10'}`}>{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2 shrink-0"><Link to="/contact" className="btn-primary hidden sm:inline-flex">Get a quote <ArrowUpRight size={16}/></Link><button type="button" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" className="lg:hidden flex h-11 w-11 justify-center items-center rounded-xl text-white border border-white/25 hover:bg-white/10">{open?<X size={23}/>:<Menu size={23}/>}</button></div>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-[55] lg:hidden"><button type="button" aria-label="Close navigation" className="absolute inset-0 w-full h-full bg-slate-950/65" onClick={()=>setOpen(false)}/><nav id="mobile-nav" aria-label="Mobile navigation" className="absolute top-0 right-0 bottom-0 w-[min(85vw,340px)] bg-slate-950 text-white shadow-2xl flex flex-col animate-slide-left"><div className="flex justify-between gap-3 items-center p-5 border-b border-white/10"><Brand compact/><button aria-label="Close" className="p-2 rounded-lg bg-white/10" onClick={()=>setOpen(false)}><X size={22}/></button></div><div className="flex-1 overflow-y-auto p-4">{navLinks.map(l=><Link key={l.to} to={l.to} onClick={()=>setOpen(false)} className={`block py-3.5 px-4 text-base font-semibold rounded-xl mb-1 ${pathname===l.to?'text-accent bg-white/10':'text-white/85 hover:bg-white/10'}`}>{l.label}</Link>)}</div><div className="p-5 border-t border-white/10"><Link to="/contact" onClick={()=>setOpen(false)} className="btn-primary w-full justify-center">Request a quote <ArrowUpRight size={16}/></Link></div></nav></div>}
  </>;
}
