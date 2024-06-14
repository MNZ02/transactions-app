import { Heading } from './Heading'
import { Input } from './Input'
import { SubHeading } from './SubHeading'
import { Button } from './Button'
import { ButtonWarning } from './ButtonWarning'
import SignIn from './SignIn'
function SignUp () {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={'Sign Up'} />
          <SubHeading label={'Enter your information to create an account'} />
          <Input placeholder={'John'} label={'First Name'} />
          <Input placeholder={'Doe'} label={'Lt Name'} />
          <div className='pt-4'>
            <Button label={'Sign Up'} />
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
