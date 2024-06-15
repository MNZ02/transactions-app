import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading } from './Heading'
import { Input } from './Input'
import { SubHeading } from './SubHeading'
import { Button } from './Button'
import { ButtonWarning } from './ButtonWarning'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignIn () {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signin', {
        username: username,
        password: password
      })
      console.log('User signed in', response.data)
      if (response.data) {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error creating user', error.message)
      if (error.response.status === 400) {
        toast.error('Invalid username or password')
      } else if (error.response.status === 403) {
        toast.error('User does not exist')
      } else {
        toast.error('Something went wrong. Please try again later!')
      }
    }
  }
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <ToastContainer />
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={'Sign In'} />
          <SubHeading label={'Enter your information to login'} />
          <Input
            name={username}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={'username'}
            label={'Username'}
          />
          <Input
            name={password}
            value={password}
            type='password'
            onChange={e => setPassword(e.target.value)}
            placeholder={'123456'}
            label={'Password'}
          />
          <div className='pt-4'>
            <Button onClick={handleClick} label={'Sign In'} />
          </div>
          <ButtonWarning
            label={"Dont't have an account?"}
            buttonText={'Sign up'}
            to={'/signup'}
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn
