import AppBar from './Appbar'
import Balance from './Balance'
import Users from './Users'

function Dashboard () {
  return (
    <div>
      <AppBar />
      <div className='m-8'>
        <Balance balance={10000} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
