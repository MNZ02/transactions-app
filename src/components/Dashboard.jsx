import { useEffect, useState } from 'react'
import { axiosInstance } from '../hooks/api'
import AppBar from './Appbar'
import Balance from './Balance'
import Users from './Users'

function Dashboard () {
  const [balance, setBalance] = useState(null)
  const getBalance = async () => {
    try {
      const response = await axiosInstance.get('/account/get-balance')
      setBalance(response.data.Balance)
      console.log(balance)
    } catch (error) {
      console.error('Error fetching balance', error.message)
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  return (
    <div>
      <AppBar />
      <div className='m-8'>
        <Balance balance={balance} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
