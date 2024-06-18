import express from 'express'
import { getBalance, transfer } from '../controllers/accountController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/get-balance', auth, getBalance)
router.post('/transfer', auth, transfer)

export default router
