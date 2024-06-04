import express from 'express'
import { getBalance } from '../controllers/accountController.js'
const router = express.Router()

router.get('/get-balance/:userId', getBalance)


export default router
