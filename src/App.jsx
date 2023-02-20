import './App.scss'
import {Route,Routes } from "react-router-dom"
import Signin from './pages/signin/SignIn'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './utilities/protectedRoute'
import Event from "../src/pages/event/Event.jsx"

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
          } />
          <Route path="/signup" element = {<Signup />} />
          <Route path="/signin" element = {<Signin />} />
          <Route path="/event" element = {
              <ProtectedRoute>
              <Event />
              </ProtectedRoute>
          } />
      </Routes>
    </div>
  )}

export default App
