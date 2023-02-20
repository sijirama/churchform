import './App.scss'
import {Route,Routes } from "react-router-dom"
import Signin from './pages/signin/SignIn'
import Signup from './pages/signup/Signup'

function App() {

  return (
    <div className="App">
      <Routes>

          <Route path="/signup" element = {<Signup />} />
          <Route path="/signin" element = {<Signin />} />
        
      </Routes>
    </div>
  )
}

export default App
