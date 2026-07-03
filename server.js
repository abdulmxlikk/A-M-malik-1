import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const services = [
  {
    id: 1,
    title: "Brand Strategy",
    subtitle: "Premium positioning for modern brands",
    priceTag: "Signature",
    description:
      "We shape your brand identity, voice, messaging, and market positioning so clients instantly understand your value.",
    model: "/models/strategy-box.glb"
  },
  {
    id: 2,
    title: "Creative Branding",
    subtitle: "Packaging your brand like a premium product",
    priceTag: "Most Loved",
    description:
      "Logo systems, color direction, visual language, packaging concepts, and launch-ready brand assets.",
    model: "/models/branding-box.glb"
  },
  {
    id: 3,
    title: "Web Experience",
    subtitle: "Immersive websites that feel expensive",
    priceTag: "Best Seller",
    description:
      "High-end websites built with motion, storytelling, smooth interactions, and strong conversion structure.",
    model: "/models/web-box.glb"
  },
  {
    id: 4,
    title: "Growth Systems",
    subtitle: "Performance-driven campaigns and funnels",
    priceTag: "Limited Edition",
    description:
      "Launch strategy, content funnels, landing pages, and growth campaigns designed to scale revenue.",
    model: "/models/growth-box.glb"
  }
];

app.get("/", (req, res) => {
  res.send("Premium Agency Backend Running");
});

app.get("/api/services", (req, res) => {
  res.json(services);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields"
    });
  }

  console.log("New Contact Request:");
  console.log({ name, email, message });

  return res.json({
    success: true,
    message: "Message sent successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
