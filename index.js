import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import mainRoute from './routes/index.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin: '*'
}))

app.use('/api/v1', userRoutes)


const client = new MongoClient(process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err))



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
