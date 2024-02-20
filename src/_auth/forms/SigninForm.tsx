import Loaderimg from '../../components/shared/loaderimg.js'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInAccount } from '@/lib/appwrite/api.js';
import { account } from '@/lib/appwrite/config.js';


function SigninForm() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;
  // const navigate = useNavigate()
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const session = await signInAccount({email,password})
    return session
    
    
    // try {
    //   const response = await account.createEmailSession(email, password);
    //   if (response.$id) {
    //     navigate('/signup');
    //     console.log(response);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen dark m-10">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center">
          <img className="w-10 m-2" src="/images/instagram.png" />
          <h1 className="m-2 text-white text-4xl">Snapgram</h1>
        </div>

        <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Sign in to your account</h2>
        <form onSubmit={onSubmit} className="flex flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
          />
          <div className="flex items-center justify-between flex-wrap">
            <label className="text-sm text-gray-200 cursor-pointer" htmlFor="remember-me">
              <input className="mr-2" id="remember-me" type="checkbox" />
              Remember me
            </label>
            <a className="text-sm text-blue-500 hover:underline mb-0.5" href="#">
              Forgot password?
            </a>
            <p className="text-white mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className='text-blue-500 -200 hover:underline'>Sign up</Link>
            </p>
          </div>
          <button
            className="w-full h-12 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >


            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loaderimg />
                Loading...
              </div>) :
              "Sign In"}

          </button>

        </form>
      </div>
    </div>
  );
}

export default SigninForm