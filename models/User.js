import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 16
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 16,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 16,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
})

const User = mongoose.model('User', userSchema)

export default User
