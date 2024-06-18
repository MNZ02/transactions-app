import { useEffect, useState } from 'react'
import { Heading } from './Heading'
import { Input } from './Input'
import { Button } from './Button'
import { axiosInstance } from '../hooks/api'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SendMoney () {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')

  useEffect(() => {
    const recipientName = searchParams.get('name')
    if (recipientName) {
      setRecipient(recipientName)
    }
  }, [searchParams])

  const handleClick = async () => {
    const to = searchParams.get('id')

    if (!amount || !to) {
      toast.error('Amount and recipient are required')
      return
    }

    try {
      const response = await axiosInstance.post('/account/transfer', {
        to,
        amount
      })
      console.log('Amount transferred', response.data)
      toast.success('Money sent successfully')
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000) // Navigate after 3 seconds
    } catch (error) {
      console.error('Error sending money', error.message)
      toast.error('Error sending money')
    }
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <ToastContainer />
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={'Send Money'} />
          <Input
            name='amount'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={'100'}
            label={'Amount'}
            type='number'
          />
          <Input
            name='recipient'
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            placeholder={'Recipient Username'}
            label={'Recipient'}
            disabled={true} // Disable editing since it's pre-filled from URL
          />
          <div className='pt-4'>
            <Button label={'Send'} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMoney
