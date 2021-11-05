import path from 'path';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  // res.send('Hello from Backend!');
  // res.send('<h1>Hello from Backend!</h1>');
  // res.send({ hello: 'world' });
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, 'db.json'));
});

app.listen(5000, () => {
  console.log('🚀 Listening on port 5000');
});
