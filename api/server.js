import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

const dbPath = path.join(process.cwd(), "db.json");
let data = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// GET all languages
app.get("/api/lang", (req, res) => {
  res.json(data.languages);
});

// GET one language by id
app.get("/api/lang/:id", (req, res) => {
  const lang = data.languages.find(l => l.id === parseInt(req.params.id));
  lang ? res.json(lang) : res.status(404).json({ error: "Not found" });
});

// POST new language
app.post("/api/lang", (req, res) => {
  const newLang = { id: data.languages.length + 1, ...req.body };
  data.languages.push(newLang);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.status(201).json(newLang);
});

export default app;  // 👈 for Vercel
