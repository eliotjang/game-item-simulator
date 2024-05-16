import express from 'express';
import connect from './schemas/index.js';
import CharactersRouter from './routes/characters.router.js';
import ItemsRouter from './routes/items.router.js';
import EquipmentRouter from './routes/equipment.router.js';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();

// body parser Middleware
app.use(express.json());

app.use('/api', [CharactersRouter, ItemsRouter, EquipmentRouter]);

// error handling
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버 연결');
});
