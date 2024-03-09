import { Routes, Route } from 'react-router-dom'
import SignupForm from './_auth/forms/SignupForm'
import SigninForm from './_auth/forms/SigninForm'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './root/pages'
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
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/allusers' element={<AllUsers />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/updatepost/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/updateprofile/:id' element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  )
}
