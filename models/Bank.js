import mongoose from "mongoose";
const { Schema } = mongoose;

const bankSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const Bank = mongoose.model('Bank', bankSchema)

export default Bank
