import express from 'express';
import { signup, signin, updateUserById, getUserBulk } from '../controllers/userController.js';
import verifyToken from '../middleware/auth.js';
const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.put('/update-user/:userId', verifyToken, updateUserById)
router.get('/user/bulk', getUserBulk)

export default router
