import express from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
const app = express()
const port = 3000

app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI)

const connectToDB = async () => {
  try {
    await client.connect()
    console.log('Connected to MongoDB')

  } catch (error) {
    console.error('Error connecting to db', error.message)
  }
}

connectToDB()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
