const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const stripe = require('./routes/stripe');
const products = require('./routes/product');
const users = require('./routes/users');
const orders = require('./routes/orders');
const productstatic = require('./products');

const app = express();

require('dotenv').config();

app.use(cors());
app.use((req, res, next) => {
  // Allow requests from all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Define allowed methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Define allowed headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Continue to the next middleware
  next();
});
app.options('*', (req, res) => {
  // Respond to preflight requests
  res.status(200).end();
});
app.use(express.json());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", products);
app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

app.get('/', (req, res) => {
  res.send("Welcome to my API...");
});

app.get('/productstatic', (req, res) => {
  res.send(productstatic);
});

const PORT = process.env.PORT || 5000;
const URI = process.env.DB_URI;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(URI).then(() => console.log("MongoDB Connected!"))
.catch((err) => console.log("Failed", err.message));