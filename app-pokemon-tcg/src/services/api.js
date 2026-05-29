import axios from 'axios';

// 10.0.2.2 é o endereço padrão para acessar o localhost do computador a partir do emulador Android
const api = axios.create({
  baseURL: 'http://192.168.1.151:3000',
});

export default api;
