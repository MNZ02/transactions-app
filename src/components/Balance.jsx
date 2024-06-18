import React from 'react'

function Balance ({ balance }) {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 w-80 text-center'>
      <h2 className='text-2xl font-bold mb-2'>Balance</h2>
      <p className='text-xl'>Rs {balance}</p>
    </div>
  )
}

export default Balance
