import express from "express";
import data from "../db.json" assert { type: "json" };

const app = express();

// GET all languages
app.get("/api/lang", (req, res) => {
  res.json(data.languages);
});

// GET one language by id
app.get("/api/lang/:id", (req, res) => {
  const lang = data.languages.find(l => l.id === parseInt(req.params.id));
  lang ? res.json(lang) : res.status(404).json({ error: "Not found" });
});

export default app; // 👈 no app.listen
