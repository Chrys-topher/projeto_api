import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usersRoutes from './routes/usersRoutes.js';
import artigosRoutes from './routes/artigosRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8080;

// __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/artigos', artigosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
