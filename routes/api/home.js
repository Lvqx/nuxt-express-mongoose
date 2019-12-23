const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Home = express.Router();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// connect
mongoose.connect('mongodb://localhost:27017/node', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("连接成功"))
  .catch(() => console.log('连接失败'))

// schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number
})

// model
const Student = mongoose.model('Students', studentSchema)

Home.get('/home/list', (req, res) => {
  Student.find().then(result => {
    res.send({
      code: 200,
      msg: '请求成功',
      data: result
    })
  }).catch(error => {
    consola.error(error)
    res.send({
      code: 500,
      msg: '数据加载失败',
      data: 'wrong'
    })
  })
})

Home.get('/home/detail/:id', (req, res) => {
  const { id } = req.params
  Student.findOne({ _id: id }).then(result => {
    res.send({
      code: 200,
      msg: '请求成功',
      data: result
    })
  }).catch(error => {
    consola.error(error)
    res.send({
      code: 500,
      msg: '数据加载失败',
      data: 'wrong'
    })
  })
})

module.exports = Home