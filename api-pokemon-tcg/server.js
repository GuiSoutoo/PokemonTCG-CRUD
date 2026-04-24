const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'cartas.json');

// Middlewares
app.use(cors());
app.use(express.json());

// Função auxiliar para ler dados do arquivo
const loadData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler arquivo:", error);
    return [];
  }
};

// Função auxiliar para salvar dados no arquivo
const saveData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erro ao salvar arquivo:", error);
  }
};

// Inicializa a lista de cartas
let cartas = loadData();

/**
 * Modelo de dados 'Carta':
 * id, nome, tipo, raridade, hp, precoMercado, dataLancamento
 */

// --- ROTAS DO CRUD ---

// Listar todas as cartas
app.get('/cartas', (req, res) => {
  res.json(cartas);
});

// Buscar uma carta por ID
app.get('/cartas/:id', (req, res) => {
  const { id } = req.params;
  const carta = cartas.find(c => c.id === id);
  if (!carta) return res.status(404).json({ message: "Carta não encontrada" });
  res.json(carta);
});

// Criar uma nova carta
app.post('/cartas', (req, res) => {
  const { id, nome, tipo, raridade, hp, precoMercado, dataLancamento, imagemUrl } = req.body;

  // Validação: Verificar se o ID já existe
  const idExiste = cartas.find(c => c.id === id);
  if (idExiste) {
    return res.status(400).json({ message: "Erro: Já existe uma carta com este ID!" });
  }

  if (!id) {
    return res.status(400).json({ message: "Erro: O campo ID é obrigatório!" });
  }

  const novaCarta = {
    id, // Agora usa o ID enviado pelo usuário
    nome,
    tipo,
    raridade,
    hp: Number(hp),
    precoMercado: Number(precoMercado),
    dataLancamento,
    imagemUrl
  };

  cartas.push(novaCarta);
  saveData(cartas);
  res.status(201).json(novaCarta);
});

// Atualizar uma carta
app.put('/cartas/:id', (req, res) => {
  const { id } = req.params;
  const { nome, tipo, raridade, hp, precoMercado, dataLancamento, imagemUrl } = req.body;

  const index = cartas.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: "Carta não encontrada" });

  cartas[index] = {
    ...cartas[index],
    nome,
    tipo,
    raridade,
    hp: Number(hp),
    precoMercado: Number(precoMercado),
    dataLancamento,
    imagemUrl // Novo atributo
  };

  saveData(cartas);
  res.json(cartas[index]);
});

// Deletar uma carta
app.delete('/cartas/:id', (req, res) => {
  const { id } = req.params;
  const index = cartas.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ message: "Carta não encontrada" });

  cartas.splice(index, 1);
  saveData(cartas);
  res.json({ success: true, message: "Carta deletada com sucesso" });
});

app.get('/', (req, res) => {
  res.send('API Pokémon TCG rodando com persistência em arquivo!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://192.168.15.7:${PORT}`);
});
