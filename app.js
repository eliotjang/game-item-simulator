import express from 'express';
import connect from './schemas/index.js';
import CharactersRouter from './routes/characters.router.js';
import ItemsRouter from './routes/items.router.js';
import EquipmentRouter from './routes/equipment.router.js';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();

// body parser middleware
app.use(express.json());
// content-type이 form인 경우에 body data를 가져올 수 있도록 구현
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static('./assets'));

app.get('/', (req, res) => {
  res.send('API Index Page');
});

app.use('/api', [CharactersRouter, ItemsRouter, EquipmentRouter]);

// error handling
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버 연결');
});
