import User from '../models/User.js'
import Bank from '../models/Bank.js'
import { signupSchema, signinSchema } from '../schemas/userSchemas.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
  const { username, firstName, lastName, password } = req.body
  console.log(req.body)

  try {
    const { success } = signupSchema.safeParse({
      username,
      firstName,
      lastName,
      password
    })
    if (!success) {
      res.status(403).send('Invalid credentials')
    }
    const usernameExists = await User.findOne({ username: username })

    if (usernameExists) {
      return res.status(403).send('Username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword
    })

    //random balance
    const balance = Math.floor(Math.random() * 10000) + 1
    const userId = user._id
    await Bank.create({ userId, balance })

    const token = jwt.sign(
      { username: username, userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    )

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

    const token = jwt.sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )

    return res.status(200).json({ message: 'User signed in', token })
  } catch (error) {
    console.error('Error during signin', error.message)
    return res.status(500).send('Internal server error')
  }
}

export const updateUserById = async (req, res) => {
  const { userId } = req.params
  console.log(userId)

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    })

    if (!updatedUser) {
      return res.status(404).send('User not found')
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating user', error.message)
    res.status(500).send('Internal server error')
  }
}

export const getUserBulk = async (req, res) => {
  try {
    const { filter } = req.query

    if (!filter) {
      return res.status(400).send('Query parameter missing')
    }

    const results = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter
          }
        },
        {
          lastName: {
            $regex: filter
          }
        }
      ]
    })

    const result = results.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
    res.json(result)
  } catch (error) {
    console.error('Error filtering user', error.message)
    res.status(500).send('Internal server error')
  }
}

export const getAllUserBulk = async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) {
      res.status(404).send('No users found')
    }
    res.json(users)

  } catch (error) {
    console.error('Error finding users', error.message)
    res.status(500).send('Internal server error')
  }
}
