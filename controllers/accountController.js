import Bank from "../models/Bank.js"
import mongoose from "mongoose"

export const getBalance = async (req, res) => {

  try {
    const account = await Bank.findOne({
      userId: req.params.userId
    })

    if (!account) {
      return res.status(404).send('Account not found')
    }

    res.status(200).json({
      Balance: account.balance
    })

  } catch (error) {
    console.error('Error fetching payment', error.message)
    res.status(500).send('Internal server error')
  }
}

export const transfer = async (req, res) => {
  try {
    const session = await mongoose.startSession()

    session.startTransaction()

    const { amount, to } = req.body;

    //fetch the account within the startTransaction
    const account = await Bank.findOne({
      userId: req.userId
    }).session(session)

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      console.log('Insufficient balance')
      return res.status(400).send('Insufficient balance');
    }

    const toAccount = await Bank.findOne({
      userId: to
    }).session(session)

    if (!toAccount) {
      return res.status(404).send('Invalid account')
    }

    await Bank.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session)
    await Bank.updateOne({ userId: to }, { $inc: { balance: +amount } }).session(session)

    await session.commitTransaction();
    res.status(200).json({ message: 'Transaction successful' })
  } catch (error) {
    console.error('Error transferring payment', error.message)
    res.status(500).send('Internal server error')
  }
}
