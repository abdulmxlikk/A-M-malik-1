import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Can3D from "./Can3D";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll-triggered zoom + rotation
    gsap.fromTo(
      containerRef.current,
      { scale: 0.85, rotateZ: -5, opacity: 0 },
      {
        scale: 1,
        rotateZ: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.3
      }
    );

    // On scroll: subtle zoom out and upward float
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(containerRef.current, {
          scale: 1 - progress * 0.25,
          y: progress * -80
        });
      }
    });

    return () => {};
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-glow" />

      <div className="container hero-grid">
        <div className="hero-text fade-up">
          <div className="hero-eyebrow">
            <span className="dot" />
            Premium Energy by Malik
          </div>

          <h1>
            <span className="highlight">A M</span> Energy
            <br />
            Drink
            <span className="malik">By Abdul Malik</span>
          </h1>

          <p className="hero-desc">
            Unleash your potential with A M Energy — crafted for those who never
            stop. 200mg caffeine, bold flavors, and zero compromise. Fuel your
            grind, own your energy.
          </p>

          <div className="hero-actions">
            <a href="#flavors" className="btn btn-primary">
              🔥 Explore Flavors
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Malik
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">200mg</div>
              <div className="label">Caffeine</div>
            </div>
            <div className="hero-stat">
              <div className="num">5</div>
              <div className="label">Bold Flavors</div>
            </div>
            <div className="hero-stat">
              <div className="num">330ml</div>
              <div className="label">Per Can</div>
            </div>
            <div className="hero-stat">
              <div className="num">100%</div>
              <div className="label">Energy</div>
            </div>
          </div>
        </div>

        <div className="hero-can-wrapper fade-up" ref={wrapperRef}>
          <div 
            className="hero-can-container" 
            ref={containerRef}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Can3D />
          </div>
        </div>
      </div>

      <div className="hero-smoke" />
    </section>
  );
}
