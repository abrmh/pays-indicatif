const express = require("express");
const path = require("path");
const pays = require("./data");

const app = express();
const PORT = process.env.PORT || 3000;

const normaliser = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// GET /api/pays?q=fra
app.get("/api/pays", (req, res) => {
  const q = normaliser(String(req.query.q || "").trim()).replace(/^\+/, "");
  if (!q) return res.json(pays);
  res.json(
    pays.filter(
      (p) =>
        normaliser(p.nom).includes(q) ||
        p.code.toLowerCase() === q ||
        p.indicatif.replace(/[+\s]/g, "").startsWith(q)
    )
  );
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () =>
  console.log(`Serveur prêt : http://localhost:${PORT}`)
);
