const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000
app.use(cors())
app.use(bodyparser.json())




dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
client.connect();
const db = client.db(dbName);

// Database Name


app.get('/', async (req, res) => {
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
app.post('/', async (req, res) => {
  const password = req.body;
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})
app.delete('/', async (req, res) => {
  const password = req.body;
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})