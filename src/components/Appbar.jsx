import React from 'react'
import { Link } from 'react-router-dom'

function AppBar ({ username }) {
  return (
    <div className='bg-slate-300 h-12 flex justify-between items-center px-4'>
      <Link to='/' className='text-white font-bold text-xl'>
        Paytm
      </Link>
      <div className='text-white'>
        {username ? (
          `Hello, ${username}`
        ) : (
          <Link to='/signin' className='text-white'>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default AppBar
