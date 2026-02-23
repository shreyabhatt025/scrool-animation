"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// register only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {

  // refs used for different elements
  const mainRef = useRef(null);
  const heroSection = useRef(null);
  const titleRef = useRef(null);
  const stats = useRef([]);
  const car = useRef(null);
  const contentBox = useRef(null);

  useEffect(() => {

    
    let tl = gsap.timeline(); // page load animation
    tl.from(titleRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
    });
    tl.from(stats.current, {  // one by one will start 
      y: 25, 
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
    }, "-=0.4");

   let scrollAnim = gsap.timeline({ // scroling animation 
      scrollTrigger: {
        trigger: heroSection.current,
        start: "top top",
        end: "+=200%",   //  distance
        scrub: 1,       
        pin: true,       
      }
    });

    scrollAnim.fromTo( // car will move from left to right when we scroll
      car.current,
      {
        x: "-100vw",
        scale: 0.8
      },
      {
        x: "100vw",
        scale: 1.5,
        ease: "none",
        duration: 2
      }
    );

    scrollAnim.to(contentBox.current, { // bluring text when car overlap
      opacity: 0,
      filter: "blur(12px)",
      scale: 0.9,
      duration: 0.3
    }, 0.8);
    
    scrollAnim.to(contentBox.current, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 0.3
    }, 1.2);
    
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };

  }, []);

  return (
    <main ref={mainRef} className="bg-black text-white min-h-[300vh]">
       <section ref={heroSection}
        className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
          <div ref={contentBox} className="z-10 text-center px-4">

          <h1 ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-[0.4em] uppercase">
            W E L C O M E <br /> I T Z F I Z Z</h1>
            <div className="flex gap-6 md:gap-12 mt-10 justify-center flex-wrap">
              {[
              { label: "Success", value: "95%" },
              { label: "Projects", value: "120+" },
              { label: "Clients", value: "50+" },
            ].map((item, i) => (<div
                key={i}
                ref={(el) => (stats.current[i] = el)}
                className="text-center">
                <h2 className="text-xl md:text-3xl font-semibold text-blue-400">
                  {item.value}</h2>
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  {item.label}</p>
              </div>
            ))}
            </div>
            </div>
             {/* car */}
        <div
          ref={car}
          className="absolute z-40"
          style={{ top: "50%", transform: "translateY(-50%)" }}>
          <img src="/car.png" alt="car"
            className="w-72 md:w-[600px]"/>
        </div>

      </section>
      <section className="h-screen flex items-center justify-center bg-zinc-950">
        <h2 className="text-zinc-700 text-2xl tracking-widest uppercase">
          THANK YOU FOR SCROLLING</h2>
      </section>

    </main>
  );
}