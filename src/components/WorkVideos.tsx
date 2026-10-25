import { useState } from 'react';
import { ArrowUpRight, Play, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const clips = [
  {
    id: 'pressure',
    title: 'High-Pressure Cleaning in Action',
    label: 'Real work footage',
    duration: '18 seconds',
    description: 'See an on-site driveway cleaning demonstration using professional pressure-washing equipment.',
    src: '/videos/pressure-cleaning.mp4',
    poster: '/video-posters/pressure-cleaning.webp',
  },
  {
    id: 'walkthrough',
    title: 'Explore Southern Biohazard Online',
    label: 'Website walkthrough',
    duration: '43 seconds',
    description: 'Take a guided look at our cleaning services, contact options and website features.',
    src: '/videos/website-walkthrough.mp4',
    poster: '/video-posters/website-walkthrough.webp',
  },
];

export default function WorkVideos() {
  const [activeClip, setActiveClip] = useState<string | null>(null);

  return (
    <section id="watch-our-work" className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28" aria-labelledby="watch-our-work-heading">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
      <div className="container-site relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-accent">VIDEO GALLERY</p>
          <h2 id="watch-our-work-heading" className="section-heading mt-4 !text-white">Watch Our Work in Action</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            A closer look at Southern Biohazard Cleaning: professional high-pressure cleaning on site and a guided tour of our services online.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {clips.map((clip, index) => (
            <Reveal key={clip.id} className="h-full">
              <article className="group h-full overflow-hidden rounded-3xl border border-white/15 bg-white/[.06] shadow-2xl shadow-black/20 transition-all duration-500 hover:-translate-y-1 hover:border-lime-400/50">
                <div className="relative aspect-video overflow-hidden bg-black">
                  {activeClip === clip.id ? (
                    <video
                      key={clip.id}
                      className="h-full w-full object-contain"
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      poster={clip.poster}
                      aria-label={clip.title}
                    >
                      <source src={clip.src} type="video/mp4" />
                      Your browser does not support embedded video.
                    </video>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveClip(clip.id)}
                      className="relative block h-full w-full cursor-pointer overflow-hidden text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-lime-400"
                      aria-label={`Play ${clip.title}`}
                    >
                      <img src={clip.poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-black/10 to-transparent" />
                      <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-lime-300/60 bg-lime-400/95 text-slate-950 shadow-xl shadow-black/40 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                        <Play size={30} fill="currentColor" className="ml-1" aria-hidden="true" />
                      </span>
                      <span className="pointer-events-none absolute bottom-4 left-5 rounded-full border border-white/30 bg-black/55 px-3 py-1.5 text-xs font-bold tracking-wide text-white">PLAY VIDEO</span>
                      <span className="pointer-events-none absolute bottom-4 right-5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">{clip.duration}</span>
                    </button>
                  )}
                </div>
                <div className="px-6 pb-7 pt-6 sm:px-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-lime-300"><Video size={15} aria-hidden="true" />{clip.label}</span>
                    <span className="text-xs font-semibold text-white/40">0{index + 1}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">{clip.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{clip.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-11 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-xl border border-lime-400/40 px-6 py-3 text-sm font-bold text-lime-300 transition-colors hover:bg-lime-400/10">Explore our photo gallery <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </Reveal>
      </div>
    </section>
  );
}