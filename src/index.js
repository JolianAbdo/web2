const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/api', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
