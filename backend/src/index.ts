import path from 'path';
import express from 'express';
import db from './db';

const app = express();

app.get('/', (req, res) => {
  // res.send('Hello from Backend!');
  // res.send('<h1>Hello from Backend!</h1>');
  // res.send({ hello: 'world' });
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/contacts', (req, res) => {
  db.query('SELECT id, name, phone, last_seen_at FROM contacts').then((result) =>
    res.send(result.rows),
  );
});

app.listen(5000, () => {
  console.log('🚀 Listening on port 5000');
});
