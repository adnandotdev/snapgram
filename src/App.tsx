import { Routes, Route } from 'react-router-dom'
import SignupForm from './_auth/forms/SignupForm'
import SigninForm from './_auth/forms/SigninForm'
import { Home } from './root/pages'
import AuthLayout from './_auth/AuthLayout'


import './globals.css'
import RootLayout from './root/RootLayout'

export default function App() {
  return (
    <main className = "flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element = {<AuthLayout />}>
          <Route path="/signin" element = {<SigninForm />} />
          <Route path="/signup" element = {<SignupForm />} />
        </Route>
        
        {/* private routes */}
        <Route element = {<RootLayout />}>
          <Route index element = {<Home />} />
        </Route>
      </Routes>
    </main>
  )
}
