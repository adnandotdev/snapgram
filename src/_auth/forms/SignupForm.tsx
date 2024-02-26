import { createUserAccount } from '@/lib/appwrite/api.js';
import Loaderimg from '../../components/shared/loaderimg.js'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '@/context/AuthContext.js';
import { account } from '@/lib/appwrite/config.js';



export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
  const { checkAuthUser } = useUserContext()
  const navigate = useNavigate()
  

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = { name, username, email, password };
    e.preventDefault();
    setIsLoading(true)  
    const newUser = await createUserAccount(formData);
    
    if(!newUser){
      return new Error("Failed to create a new user account."); // add the error dilog box in return
    }
    
    try {
      const response = await account.createEmailSession(email, password);
      if (response.$id) {
        navigate('/');
        console.log(response.$id);
        
        const isLoggedIn = await checkAuthUser()
        
        if(isLoggedIn){
          setName('');  
          setUserName('');
          setEmail('');
          setPassword('');
    
          // navigate('/')
        } else {
          console.log(Error)
        }

      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
    
    

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