import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import { axiosInstance } from '../hooks/api'
import { useNavigate } from 'react-router-dom'

function Users () {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')

  const fetchAllUsers = async () => {
    try {
      const response = await axiosInstance.get('/users/bulk')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users', error.message)
    }
  }

  const fetchFilteredUser = async () => {
    try {
      const response = await axiosInstance.get('/user/bulk', {
        params: { filter }
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users', error.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  useEffect(() => {
    if (filter) fetchFilteredUser()
    else fetchAllUsers()
  }, [filter])

  return (
    <>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input
          type='text'
          onChange={e => setFilter(e.target.value)}
          placeholder='Search users..'
          className='w-full px-2 py-1 border rounded border-slate-200'
        />
      </div>
      <div>
        {users.map(user => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  )
}

function User ({ user }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/send-money?id=${user._id}&name=${user.firstName}`)
  }
  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <div className='rounded-full h-12 2-12 bg-slate-200 flex justify-center mt-1 mr-2'>
          <div className='flex flex-col justify-center h-full w-12 text-center text-xl'>
            {' '}
            {user.firstName[0]}
          </div>
        </div>
        <div className='flex flex-col justify-center h-full'>
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center h-full'>
        <Button onClick={handleClick} label={'Send Money'} />
      </div>
    </div>
  )
}

export default Users
