const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const bodyParser = require('body-parser')

const mongoose = require('mongoose');

// 连接
mongoose.connect('mongodb://localhost:27017/node', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("连接成功"))
  .catch(() => console.log('连接失败'))

// 规则
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number
})

// 模型
const Student = mongoose.model('Students', studentSchema)
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser())

  app.get('/api/home/list', (req, res) => {
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

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
