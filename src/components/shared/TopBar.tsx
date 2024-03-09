import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '@/lib/appwrite/config'
import { useUserContext } from '@/context/AuthContext'

const TopBar = () => {
    const navigate = useNavigate()
    const {user} = useUserContext()

    const signOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
            try {
                const session = await account.deleteSession('current')
                console.log(session)
                navigate('signin')  
            } catch (error) {
                console.log(error)
        }
    }
  return (
    <section className="sticky top-0 z-50 md:hidden bg-gray-900 w-full">
        <div className="flex justify-between py-1 px-5">
            <Link to="/" className="flex py-1">
                <img 
                src="/images/instagram.png"
                alt ="logo"
                width ={30}
                height={30}
                /> 
                <span className="px-2 text-white text-lg">Snapgram</span>  
            </Link>
            

            <div className='flex gap-4 items-center'>
                 <button
                 onClick={(e) => signOut(e)}>
                    <img src="/icons/logout.svg" alt="Logout" />
                 </button>
                 <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                    <img
                    src={user.imageUrl || '/icons/profile-placeholder.svg'} 
                    alt='profile'
                    className='h-8 w-8 rounded-full'/>
                 </Link>
            </div>
        </div>
    </section>
  )
}

export default TopBar