import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { site } from './config/site';
import Navbar from './components/Navbar';
import GlobalAnimations from './components/GlobalAnimations';
import Footer from './components/Footer';
import PWAInstall from './components/PWAInstall';
import MobileBottomMenu from './components/MobileBottomMenu';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import NotFound from './pages/NotFound';
import Home from './pages/Home';import About from './pages/About';import Services from './pages/Services';import Gallery from './pages/Gallery';import FAQ from './pages/FAQ';import Testimonials from './pages/Testimonials';import Contact from './pages/Contact';
function RoutingEffects(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'auto'});},[pathname]);return null;}
function ServiceWorker(){useEffect(()=>{
 if(!('serviceWorker' in navigator))return;
 const run=async()=>{
  try{
   if(site.features.pwaEnabled){await navigator.serviceWorker.register('/sw.js',{scope:'/'});return;}
   // Remove registrations scoped to this site while the installable app is disabled.
   const regs=await navigator.serviceWorker.getRegistrations();
   await Promise.all(regs.filter(reg=>new URL(reg.scope).origin===location.origin && new URL(reg.scope).pathname==='/').map(reg=>reg.unregister()));
   if('caches' in window){const keys=await caches.keys();await Promise.all(keys.filter(k=>true).map(k=>caches.delete(k)));}
  }catch(err){console.warn('Service worker setup:',err);}
 };run();
},[]);return null;}
export default function App(){return <div style={{'--accent':site.brand.accent,'--accent-dark':site.brand.accentDark} as React.CSSProperties}><BrowserRouter><RoutingEffects/><GlobalAnimations/><ServiceWorker/><LoadingScreen/><div className="min-h-screen flex flex-col"><Navbar/><main className="flex-1" id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/testimonials" element={<Testimonials/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></div><FloatingWhatsApp/><PWAInstall/><MobileBottomMenu/><ScrollToTop/></BrowserRouter></div>;}
