import Typewriter from './Typewriter';
export default function PageHero({eyebrow,title,subtitle}:{eyebrow:string;title:string;subtitle:string}){
 return <section className="relative bg-slate-950 text-white pt-40 pb-20 overflow-hidden"><div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-lime-500/10 blur-3xl"/><div className="container-site relative text-center"><p className="eyebrow text-accent">{eyebrow}</p><h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3"><Typewriter text={title}/></h1><div className="h-1 w-16 bg-accent mx-auto rounded my-6"/><p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">{subtitle}</p></div></section>;
}
