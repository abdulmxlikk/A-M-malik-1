import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const flavors = [
  {
    id: 1,
    name: "Lemon Lime",
    tag: "Citrus Burst",
    image: "/images/am-lemon-lime.png",
    colors: ["#e8e24e", "#7ecb3c"],
    accent: "rgba(200, 210, 50, 0.3)",
    glow: "rgba(200, 210, 50, 0.15)",
    description:
      "A sharp, electric fusion of zesty lemon and sweet lime. Built to wake up your senses instantly. Perfect for early mornings and intense workouts where focus is everything. Clean finish, zero aftertaste.",
    profile: "Citrus / Sharp / Refreshing"
  },
  {
    id: 2,
    name: "Berry Blast",
    tag: "Classic Original",
    image: "/images/am-berry-blast.png",
    colors: ["#1a1a1a", "#e6192a"],
    accent: "rgba(230, 25, 42, 0.3)",
    glow: "rgba(230, 25, 42, 0.15)",
    description:
      "The legendary A M original. A powerful blend of dark mixed berries with an explosive edge. Smooth yet intense, this is the flagship flavor that started it all. Maximum impact.",
    profile: "Dark Berry / Smooth / Intense"
  },
  {
    id: 3,
    name: "Blue Ice",
    tag: "Arctic Chill",
    image: "/images/am-blue-ice.png",
    colors: ["#ffffff", "#00d4ff"],
    accent: "rgba(0, 212, 255, 0.3)",
    glow: "rgba(0, 212, 255, 0.15)",
    description:
      "Sub-zero refreshment. A frosty, sweet rush of blue raspberry that cools you down while hyping you up. The ultimate heat-beater for long nights and extreme pressure.",
    profile: "Blue Raspberry / Frosty / Sweet"
  },
  {
    id: 4,
    name: "Mango Rush",
    tag: "Tropical Fire",
    image: "/images/am-mango-rush.png",
    colors: ["#ff8c00", "#f3d28b"],
    accent: "rgba(255, 140, 0, 0.3)",
    glow: "rgba(255, 140, 0, 0.15)",
    description:
      "Pure liquid gold. The exotic, juicy taste of ripe mangoes hit with a sudden rush of pure energy. Sweet, tropical, and aggressively refreshing.",
    profile: "Tropical Mango / Sweet / Bold"
  },
  {
    id: 5,
    name: "Green Apple",
    tag: "Fresh Energy",
    image: "/images/am-green-apple.png",
    colors: ["#3cb371", "#c0c0c0"],
    accent: "rgba(60, 179, 113, 0.3)",
    glow: "rgba(60, 179, 113, 0.15)",
    description:
      "Crisp, tart, and undeniably electric. The unmistakable bite of sour green apple balanced with a smooth energy rush. Highly addictive and built for pure focus.",
    profile: "Sour Apple / Crisp / Tart"
  }
];

export default function Flavors() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeFlavor = flavors[activeIdx];
  const canRef = useRef(null);
  const detailsRef = useRef(null);

  const handleSelect = (idx) => {
    if (idx === activeIdx) return;
    
    // Animate out
    gsap.to([canRef.current, detailsRef.current], {
      opacity: 0,
      y: 15,
      duration: 0.2,
      onComplete: () => {
        setActiveIdx(idx);
        // Animate in
        gsap.fromTo(
          [canRef.current, detailsRef.current],
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 }
        );
      }
    });
  };

  return (
    <section className="section" id="flavors">
      <div className="container">
        <div className="fade-up">
          <div className="section-eyebrow">The Collection</div>
          <h2 className="section-title">
            Five bold flavors. One unstoppable energy.
          </h2>
        </div>

        {/* Big Detail View */}
        <div
          className="flavor-showcase fade-up"
          style={{
            "--flavor-accent": activeFlavor.accent,
            "--flavor-glow": activeFlavor.glow
          }}
        >
          <div className="flavor-showcase-image" ref={canRef}>
            <div className="glow-backdrop" />
            <img
              src={activeFlavor.image}
              alt={activeFlavor.name}
              className="big-can-img"
            />
          </div>

          <div className="flavor-showcase-details" ref={detailsRef}>
            <div className="flavor-tag-large">{activeFlavor.tag}</div>
            <h3 className="flavor-name-large">{activeFlavor.name}</h3>
            
            <div className="flavor-colors-large">
              {activeFlavor.colors.map((c, i) => (
                <span
                  key={i}
                  className="flavor-dot-large"
                  style={{ background: c }}
                  title={`Color: ${c}`}
                />
              ))}
            </div>

            <p className="flavor-long-desc">{activeFlavor.description}</p>
            
            <div className="flavor-profile">
              <span className="profile-label">Taste Profile:</span>
              <span className="profile-value">{activeFlavor.profile}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="flavors-selector fade-up">
          {flavors.map((flavor, idx) => (
            <button
              key={flavor.id}
              className={`flavor-thumb ${idx === activeIdx ? "active" : ""}`}
              onClick={() => handleSelect(idx)}
              style={{
                "--thumb-accent": flavor.accent
              }}
            >
              <img src={flavor.image} alt={flavor.name} />
              <div className="thumb-name">{flavor.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
