const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extends: true}));

app.post('/submit', (req, res) => {
  const {name, year} = req.body;
  res.send(`Name: ${name}, Year: ${year}`);
});

app.listen(2007, () => {
  console.log('Express server running at http://localhost:2007');
});