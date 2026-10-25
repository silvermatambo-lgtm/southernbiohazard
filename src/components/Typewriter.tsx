import { useEffect, useState } from 'react';
export default function Typewriter({text}:{text:string}){
 const [content,setContent]=useState(text);
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){setContent(text);return;}
  setContent('');let i=0;
  const id=window.setInterval(()=>{i+=1;setContent(text.slice(0,i));if(i>=text.length)window.clearInterval(id);},55);
  return()=>window.clearInterval(id);
 },[text]);
 return <span aria-label={text} className="inline-block min-h-[1em]"><span aria-hidden="true">{content}</span><span className="typing-cursor" aria-hidden="true"/></span>;
}
