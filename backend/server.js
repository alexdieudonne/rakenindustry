import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import cors from 'cors'
import adressRouter from './routers/adressRouter.js';
import returnRouter from './routers/returnRouter.js';
import promoRouter from './routers/promoRouter.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//"mongodb+srv://alex:Axel1235@cluster0.lyco6.mongodb.net/raken?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(cors(), function (req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  next();
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/adresse', adressRouter);
app.use('/api/products', productRouter);
app.use('/api/returns', returnRouter);
app.use('/api/orders', orderRouter)
app.use('/api/promo', promoRouter);
app.on('error', ((err) => {
  //console.log(err)
}))

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4100;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
