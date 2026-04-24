# Pokémon TCG CRUD 🎴

Este projeto é uma aplicação completa para gerenciamento (CRUD) de cartas de Pokémon TCG. Ele consiste em uma **API REST** desenvolvida em Node.js para o backend e um **Aplicativo Mobile** desenvolvido com Expo (React Native).

## 🚀 Funcionalidades
- **Listar Cartas:** Visualização de todos os Pokémons cadastrados com foto e detalhes.
- **Cadastrar Nova Carta:** Formulário completo com validação e prévia de imagem.
- **Editar Carta:** Alteração de dados de cartas já existentes.
- **Excluir Carta:** Remoção de cartas da coleção.
- **Persistência Local:** Os dados são salvos em um arquivo JSON no servidor.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** & **Express**: Estrutura da API.
- **CORS**: Para permitir conexões do aplicativo mobile.
- **FS (File System)**: Para persistência de dados em arquivo local.

### Frontend
- **React Native** & **Expo**: Desenvolvimento mobile multiplataforma.
- **Axios**: Consumo da API REST.
- **React Hooks**: Gerenciamento de estado e ciclo de vida.

---

## 📋 Modelo de Dados (Entidade: Carta)
O projeto utiliza 8 atributos para cada carta:
1. `id`: Identificador único (UUID/Timestamp).
2. `nome`: Nome do Pokémon.
3. `tipo`: Tipo elemental (Fogo, Água, etc).
4. `raridade`: Raridade da carta.
5. `hp`: Pontos de vida (Numérico).
6. `precoMercado`: Preço estimado (Numérico).
7. `dataLancamento`: Data de lançamento da coleção.
8. `imagemUrl`: Link (URL) da imagem da carta (Obrigatório).

---

## ⚙️ Como Rodar o Projeto

### 1. Backend (API)
Abra um terminal na pasta raiz do projeto:
```bash
cd api-pokemon-tcg
npm install
npm run dev
```
O servidor iniciará em `http://192.168.15.7:3000` (Verifique seu IP via `ipconfig` se necessário).

### 2. Frontend (App Mobile)
Abra um **segundo** terminal na pasta raiz do projeto:
```bash
cd app-pokemon-tcg
npm install
npx expo start
```

#### Para visualizar:
- **No Emulador Android:** Pressione `a` no terminal (Certifique-se que o emulador no Android Studio esteja aberto).
- **No Celular Físico:** Baixe o app **Expo Go** e leia o QR Code que aparecerá no terminal.

---

## ⚠️ Configurações Importantes (Windows/Emulator)
- **Endereço da API:** No arquivo `app-pokemon-tcg/src/services/api.js`, o endereço IP deve ser o da sua máquina local para que o emulador/celular consiga se comunicar com o servidor Node.js.
- **Firewall:** Caso ocorra `Network Error`, verifique se a porta `3000` está liberada no seu Firewall.

---

Desenvolvido como parte do projeto de Manutenção de Cartas Pokémon TCG.
