const express = require('express');

const Home = express.Router();

Home.get('/api/home/list', (req, res) => {
  res.send('home list ~')
})

module.exports = Home