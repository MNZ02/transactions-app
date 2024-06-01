import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string().min(1, 'Username is required').max(20, 'Username shouldnot exceed 20 characters'),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  password: z.string().min(6, 'Password should be atleast 6 characters')
})



export const signinSchema = z.object({
  username: z.string().min(1, 'Username is required').max(20, 'Username shouldnot exceed 20 characters'),
  password: z.string().min(6, 'Password should be atleast 6 characters')
})
