import User from '../models/User.js'
import { signupSchema, signinSchema } from '../schemas/userSchemas.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  try {
    const { success } = signupSchema.safeParse({ username, firstName, lastName, password })
    if (!success) {
      res.status(403).send('Invalid credentials')
    }
    const usernameExists = await User.findOne({ username: username })

    if (usernameExists) {
      return res.status(403).send('Username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, firstName, lastName, password: hashedPassword, })

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

    return res.status(201).json({ message: 'User created', token })
  } catch (error) {
    console.error('Error during signup', error.message)
    return res.status(500).send('Internal server error')
  }

}

export const signin = async (req, res) => {
  const { username, password } = req.body

  try {

    const { success } = signinSchema.safeParse({ username, password })

    if (!success) {
      return res.status(400).send('Invalid credentials')
    }

    const user = await User.findOne({ username: username })

    if (!user) {
      return res.status(403).send('User does not exist')
    }

    //check password 

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(403).send('Invalid credentials')
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h'
    })

    return res.status(200).json({ message: 'User signed in', token })
  } catch (error) {

    console.error('Error during signin', error.message)
    return res.status(500).send('Internal server error')
  }
}


