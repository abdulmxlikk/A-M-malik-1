const features = [
  {
    icon: "⚡",
    title: "200mg Caffeine",
    desc: "Max-level energy per can. Smooth, sustained power without the crash."
  },
  {
    icon: "🎯",
    title: "Zero Compromise",
    desc: "Bold flavor meets clean energy. No artificial aftertaste, ever."
  },
  {
    icon: "🧊",
    title: "Ice Cold Ready",
    desc: "Best served chilled. Designed for peak refreshment on the go."
  },
  {
    icon: "🏆",
    title: "Premium Quality",
    desc: "Crafted by Malik with uncompromising standards. A M means excellence."
  }
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="fade-up" style={{ textAlign: "center" }}>
          <div className="section-eyebrow">Why A M</div>
          <h2
            className="section-title"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            Engineered for those who never stop.
          </h2>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card fade-up" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
