const mongoose = require('mongoose');

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