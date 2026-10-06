import {useEffect,useRef,useState} from "react";
import {AnimatePresence,motion,useScroll,useSpring,useTransform} from "framer-motion";
import {ArrowDown,ArrowRight,Heart,Sparkles,Star} from "lucide-react";
import FloatingHearts from "./components/FloatingHearts";
import SectionHeading from "./components/SectionHeading";

const photos = [
  {
    src: "/photos/first-memory.jpg",
    title: "The first little memory",
    note: "I didn't know this moment would become something I would always want to remember."
  },
  {
    src: "/photos/memory-02.jpg",
    title: "The moments between",
    note: "Some of my favorite memories are the ones that weren't planned."
  },
  {
    src: "/photos/memory-03.jpg",
    title: "Us, being us",
    note: "No perfect picture. Just us."
  },
  {
    src: "/photos/memory-04.jpeg",
    title: "One of those days",
    note: "A small moment that somehow became a big memory."
  },
  {
    src: "/photos/memory-05.jpeg",
    title: "Another little chapter",
    note: "And somehow, there were already so many memories."
  },
  {
    src: "/photos/memory-06.jpeg",
    title: "The kind of happiness",
    note: "The kind that doesn't need a reason."
  },
  {
    src: "/photos/memory-07.jpeg",
    title: "A memory worth keeping",
    note: "If I could save moments forever, this would be one of them."
  },
  {
    src: "/photos/memory-08.jpeg",
    title: "Still my favorite",
    note: "Some pictures become special simply because you're in them."
  },
  {
    src: "/photos/memory-09.jpeg",
    title: "And then there was us",
    note: "Maybe this was never just a collection of memories."
  }
];
export default function App(){
 const [started,setStarted]=useState(false),[secret,setSecret]=useState(false),[birthday,setBirthday]=useState(false);
 const cursor=useRef(null);
 useEffect(()=>{const f=e=>{if(cursor.current)cursor.current.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`};addEventListener("pointermove",f);return()=>removeEventListener("pointermove",f)},[]);
 return <><div ref={cursor} className="cursor-glow"/><AnimatePresence mode="wait">{!started?<Intro onStart={()=>setStarted(true)}/>:<Story secret={secret} setSecret={setSecret} birthday={birthday} setBirthday={setBirthday}/>}</AnimatePresence></>
}

function Intro({onStart}){
 return <motion.main className="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:1.04,filter:"blur(10px)"}}>
  <FloatingHearts count={30}/><div className="intro-blobs"><i/><i/><i/></div>
  <div className="intro-top"><span>FOR SOMEONE VERY SPECIAL</span><span>01 / 06</span></div>
  <div className="intro-scene">
   <motion.div className="orb orb-left" initial={{x:-90,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1.4}}/>
   <motion.div className="orb orb-right" initial={{x:90,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1.4,delay:.2}}/>
   <motion.div className="person boy" initial={{x:-260,opacity:0}} animate={{x:-85,opacity:1}} transition={{duration:1.8,ease:[.16,1,.3,1]}}><b/><i/><em/><em/></motion.div>
   <motion.div className="person girl" initial={{x:260,opacity:0}} animate={{x:85,opacity:1}} transition={{duration:1.8,delay:.15,ease:[.16,1,.3,1]}}><b/><i/><em/><em/></motion.div>
   <motion.div className="center-heart" initial={{scale:0,opacity:0}} animate={{scale:[0,1.2,1],opacity:1}} transition={{delay:1.9,duration:1}}>♥</motion.div>
  </div>
  <motion.div className="intro-copy" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:1.7,duration:1}}>
   <span>A LITTLE STORY ABOUT TWO PEOPLE</span>
   <h1>Somewhere between<br/><i>ordinary</i> and extraordinary...</h1>
   <p>something beautiful happened.</p>
   <motion.button className="primary-button" onClick={onStart} whileHover={{y:-4,scale:1.03}} whileTap={{scale:.97}}>ENTER OUR STORY <ArrowRight size={16}/></motion.button>
  </motion.div>
  <div className="scroll-hint">SCROLL TO BEGIN <ArrowDown size={14}/></div>
 </motion.main>
}

function Story({secret,setSecret,birthday,setBirthday}){
 const ref=useRef(null);const {scrollYProgress}=useScroll({target:ref});const p=useSpring(scrollYProgress,{stiffness:70,damping:18});
 return <motion.main ref={ref} className="story" initial={{opacity:0}} animate={{opacity:1}}>
  <FloatingHearts count={22}/><div className="progress"><motion.div style={{scaleX:p}}/></div>
  <section className="chapter"><div className="watermark">01</div><SectionHeading eyebrow="THE FIRST CHAPTER">Before there was <i>us.</i></SectionHeading><motion.div className="chapter-text" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><p>There was just you.</p><p>There was just me.</p><p>And somehow, the universe put us in the same story.</p></motion.div><Heart className="small-heart" fill="currentColor"/></section>
  <MemoryReveal/>
  <MemoryWall/>
  <LoveNotes secret={secret} setSecret={setSecret}/>
  <Final birthday={birthday} setBirthday={setBirthday}/>
 </motion.main>
}

function MemoryReveal(){
 const r=useRef(null);const {scrollYProgress}=useScroll({target:r,offset:["start 90%","end 25%"]});const scale=useTransform(scrollYProgress,[0,1],[1.18,1]);const blur=useTransform(scrollYProgress,[0,.35,1],[16,0,0]);const rotate=useTransform(scrollYProgress,[0,1],[-2,0]);
 return <section className="memory-reveal"><SectionHeading eyebrow="THE FIRST MEMORY">And then...<br/><i>there was you.</i></SectionHeading>
 <motion.div ref={r} className="hero-photo" style={{rotate}} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:1}}>
  <div className="photo-label"><span>MEMORY / 001</span><span>THE BEGINNING</span></div><motion.img src={photos[0].src} alt="A special memory together" style={{scale,filter:blur}}/><div className="photo-shine"/><div className="photo-border"/><div className="grain"/>
 </motion.div>
 <motion.div className="memory-caption" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><span>SOMEWHERE IN OUR STORY</span><p>Some memories don't announce themselves.<br/>They quietly become unforgettable.</p></motion.div>
 </section>
}

function MemoryWall(){
 return <section className="memory-wall"><SectionHeading eyebrow="THE LITTLE THINGS">The moments I would<br/><i>keep forever.</i></SectionHeading>
 <div className="photo-grid">{photos.slice(1).map((p,i)=><motion.article key={p.src} className="memory-card" initial={{opacity:0,y:70,rotate:i?3:-3}} whileInView={{opacity:1,y:0,rotate:i?2:-2}} viewport={{once:true,amount:.25}} transition={{duration:1}} whileHover={{y:-12,rotate:0,scale:1.025}}><div className="tape"/><img src={p.src} alt={p.title}/><span>0{i+2}</span><h3>{p.title}</h3><p>{p.note}</p></motion.article>)}</div><Heart className="wall-heart" fill="currentColor"/></section>
}

function LoveNotes({secret,setSecret}){
 const notes=["Your laugh.","The way you look at me.","Our random conversations.","How safe everything feels with you.","The tiny things you remember.","Just... you."];
 return <section className="love-notes"><div className="orbit"/><SectionHeading eyebrow="A FEW THINGS I NEVER WANT YOU TO FORGET">You make ordinary days<br/><i>feel softer.</i></SectionHeading>
 <div className="note-cloud">{notes.map((n,i)=><motion.div key={n} className={`note n${i+1}`} initial={{opacity:0,scale:.7,rotate:-8+i*3}} whileInView={{opacity:1,scale:1,rotate:-8+i*3}} viewport={{once:true}} transition={{delay:i*.08,type:"spring",stiffness:180}} whileHover={{y:-8,rotate:0,scale:1.04}}><Heart size={16} fill="currentColor"/>{n}</motion.div>)}</div>
 <button className="soft-button" onClick={()=>setSecret(true)}><Sparkles size={15}/> THERE'S A LITTLE SECRET</button>
 <AnimatePresence>{secret&&<motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="modal-card" initial={{scale:.75,y:30}} animate={{scale:1,y:0}} exit={{scale:.75,y:30}}><button className="close" onClick={()=>setSecret(false)}>×</button><Heart size={34} fill="currentColor"/><span>OPEN WHEN YOU MISS ME</span><h3>Someone out here is ridiculously grateful that you exist.</h3><p>And yes, that someone is me. Obviously.</p></motion.div></motion.div>}</AnimatePresence>
 </section>
}

function Final({birthday,setBirthday}){
 return <section className="final"><div className="final-orb a"/><div className="final-orb b"/><motion.div className="final-content" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}}>
 <span>AND FINALLY...</span><div className="big-heart"><Heart size={43} fill="currentColor"/><i/><i/></div><h2>Happy Birthday,<br/><i>my favorite person.</i></h2><p>Here's to every memory we've made,<br/>and every beautiful one still waiting for us.</p><button className="soft-button" onClick={()=>setBirthday(true)}><Star size={16} fill="currentColor"/> ONE LAST SURPRISE</button></motion.div>
 <AnimatePresence>{birthday&&<motion.div className="modal birthday" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><FloatingHearts count={45}/><motion.div className="birthday-card" initial={{scale:.65,y:50}} animate={{scale:1,y:0}} transition={{type:"spring",stiffness:110,damping:14}}><Heart size={30} fill="currentColor"/><span>FOR YOU ♥</span><h3>Happy Birthday</h3><p>I hope this year gives you back even a fraction of the happiness you've brought into my life.</p><div className="signature">with all my love</div><button onClick={()=>setBirthday(false)}>KEEP THIS MOMENT</button></motion.div></motion.div>}</AnimatePresence>
 </section>
}