import { useNavigate } from 'react-router-dom'
import { Heading } from './Heading'
import { Input } from './Input'
import { SubHeading } from './SubHeading'
import { Button } from './Button'
import { ButtonWarning } from './ButtonWarning'
import { useState } from 'react'
import axios from 'axios'

function SignUp () {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signup', {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
      })
      console.log('User created', response.data)
      if (response.data) {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error creating user', error.message)
    }
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={'Sign Up'} />
          <SubHeading label={'Enter your information to create an account'} />
          <Input
            name='firstName'
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value)
            }}
            placeholder={'John'}
            label={'First Name'}
          />
          <Input
            name='lastName'
            value={lastName}
            onChange={e => {
              setLastName(e.target.value)
            }}
            placeholder={'Doe'}
            label={'Last Name'}
          />
          <Input
            name='username'
            value={username}
            onChange={e => {
              setUsername(e.target.value)
            }}
            placeholder={'username'}
            label={'Username'}
          />
          <Input
            name='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
            placeholder={'123456'}
            label={'Password'}
          />
          <div className='pt-4'>
            <Button onClick={handleClick} label={'Sign Up'} />
          </div>
          <ButtonWarning
            label={'Already have an account?'}
            buttonText={'Sign in'}
            to={'/signin'}
          />
        </div>
      </div>
    </div>
  )
}

export default SignUp
