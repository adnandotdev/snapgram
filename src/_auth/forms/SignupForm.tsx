import { createUserAccount, signInAccount } from '@/lib/appwrite/api.js';
import Loaderimg from '../../components/shared/loaderimg.js'
import { Link } from 'react-router-dom';
import { useState } from 'react';



function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = { name, username, email, password };
    e.preventDefault();
    const newUser = createUserAccount(formData);
    
    if(!newUser){
      return Error; // add the error dilog box in return
    }
    
    const session = await signInAccount({email,password})
    return session
  }
  return (

    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit = {onSubmit} className="flex flex-col">
          <div className="flex items-center justify-center">
            <img className="w-10 m-2" src="/images/instagram.png" />
            <h1 className="m-2 text-white text-4xl">Snapgram</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Sign Up</h2>
          <input 
            onChange={(e)=> setName(e.target.value)} 
            placeholder= "Name" 
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="text" 
          />
          <input 
            onChange={(e)=> setUserName(e.target.value)} 
            placeholder="User Name" 
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="text" 
            />
          <input
            onChange={(e)=> setEmail(e.target.value)} 
            placeholder="Email address"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
          />
          <input
            onChange={(e)=> setPassword(e.target.value)} 
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
          />
          <p className="text-white mt-4">
            Already have an account?
            <Link to="/signin" className='text-blue-500 -200 hover:underline'> Log in</Link>
          </p>
          <button
            className="w-full h-12 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loaderimg />
                Loading...
              </div>) :
              "Sign Up"}

          </button>        
        </form>
      </div>
    </div>


  )
}

export default SignupForm