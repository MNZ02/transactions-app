import Bank from "../models/Bank.js"

export const getBalance = async (req, res) => {
  const { userId } = req.params

  try {
    const account = await Bank.findOne(userId)

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
