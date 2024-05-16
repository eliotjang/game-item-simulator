import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@express-mongo.cvttvpl.mongodb.net/?retryWrites=true&w=majority&appName=express-mongo`,
      {
        dbName: 'item_simulator',
      }
    )
    .then(() => console.log('MongoDB 연결 성공'))
    .catch((err) => console.log(`MongoDB 연결 실패 ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;
