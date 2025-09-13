import express from "express";
import cors from "cors"; 
import data from "../db.json" with { type: "json" };

const app = express();

app.use(cors({ origin: [
  "http://localhost:5173",
  "https://abhisecomnew.netlify.app"
],
 }));

app.get("/api", (req, res) => {
  res.json(data);
});

// GET all languages
app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.get("/api/navlinks", (req, res) => {
  res.json(data.navlinks);
});

// GET one language by id
app.get("/api/products/:id", (req, res) => {
  const lang = data.find(l => l.id === parseInt(req.params.id));
  lang ? res.json(lang) : res.status(404).json({ error: "Not found" });
});

export default app; // 👈 no app.listen
