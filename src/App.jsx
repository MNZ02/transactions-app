import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import Dashboard from './components/Dashboard.jsx'
import SendMoney from './components/SendMoney.jsx'
function App () {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send-money' element={<SendMoney />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
