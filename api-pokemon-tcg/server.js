const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumentado para suportar Base64 de fotos

// Listar todas as cartas
app.get('/cartas', (req, res) => {
  db.all("SELECT * FROM cartas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Buscar uma carta por ID
app.get('/cartas/:id', (req, res) => {
  db.get("SELECT * FROM cartas WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Carta não encontrada" });
    res.json(row);
  });
});

// Criar uma nova carta
app.post('/cartas', (req, res) => {
  const { nome, tipo, raridade, hp, precoMercado, dataLancamento, foto, latitude, longitude } = req.body;

  const sql = `INSERT INTO cartas (nome, tipo, raridade, hp, precoMercado, dataLancamento, foto, latitude, longitude)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [nome, tipo, raridade, Number(hp), Number(precoMercado), dataLancamento, foto, latitude, longitude];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

// Atualizar uma carta
app.put('/cartas/:id', (req, res) => {
  const { nome, tipo, raridade, hp, precoMercado, dataLancamento, foto, latitude, longitude } = req.body;
  const sql = `UPDATE cartas SET
               nome = ?, tipo = ?, raridade = ?,
               hp = ?, precoMercado = ?, dataLancamento = ?,
               foto = ?, latitude = ?, longitude = ?
               WHERE id = ?`;
  const params = [nome, tipo, raridade, Number(hp), Number(precoMercado), dataLancamento, foto, latitude, longitude, req.params.id];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Carta atualizada com sucesso" });
  });
});

// Deletar uma carta
app.delete('/cartas/:id', (req, res) => {
  db.run("DELETE FROM cartas WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Carta deletada com sucesso" });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Pokémon TCG rodando em http://localhost:${PORT}`);
});
