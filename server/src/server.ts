import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { routes } from './routes/index';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Checar API: http://localhost:${PORT}/health`);
});
