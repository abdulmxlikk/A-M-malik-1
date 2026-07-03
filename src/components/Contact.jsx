import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Message sent successfully! ✅");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "Something went wrong");
      }
    } catch {
      setStatus("Server offline. Please reach out via email or phone directly.");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="fade-up">
          <div className="section-eyebrow">Get In Touch</div>
          <h2 className="section-title">
            Let's connect. Reach out to Malik.
          </h2>
          <p className="section-desc">
            Interested in A M Energy, partnerships, or just want to say
            hello? Drop a message or reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card fade-up">
            <h3>Contact Details</h3>
            <ul className="contact-info">
              <li>
                <span className="icon">📞</span>
                <div>
                  <div style={{ color: "#777", fontSize: "0.78rem", marginBottom: 2 }}>Phone</div>
                  <a href="tel:8125632920">8125632920</a>
                </div>
              </li>
              <li>
                <span className="icon">📧</span>
                <div>
                  <div style={{ color: "#777", fontSize: "0.78rem", marginBottom: 2 }}>Email</div>
                  <a href="mailto:shaiabdulmalik@0112gmail.com">shaiabdulmalik@0112gmail.com</a>
                </div>
              </li>
              <li>
                <span className="icon">🔗</span>
                <div>
                  <div style={{ color: "#777", fontSize: "0.78rem", marginBottom: 2 }}>LinkedIn</div>
                  <a
                    href="https://www.linkedin.com/in/shaik-abdul-malik-822a091b5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shaik Abdul Malik
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-card fade-up">
            <h3>Send a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Tell us what you need..."
                value={form.message}
                onChange={handleChange}
              />
              <button className="btn btn-primary" type="submit">
                Send Message 🚀
              </button>
              <p className="form-status">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
