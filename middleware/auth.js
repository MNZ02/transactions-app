import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).send('Token does not exists')
  }

  const token = authHeader.split(" ")[1];


  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.userId = decodedToken.userId
    next()
  } catch (error) {
    console.error('Error verifying token', error.message)
    return res.status(500).send('Internal server errror')
  }
}

export default verifyToken
