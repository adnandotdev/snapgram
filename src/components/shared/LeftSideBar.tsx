import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'
import { account } from '@/lib/appwrite/config'


const LeftSideBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useUserContext()

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
    <nav className='hidden md:flex flex-col justify-between px-6 py-6 min-w-[270px] bg-gray-900'>
      <div className='flex flex-col gap-11'>
        <Link to="/" className="flex py-2 ">
          <img
            src="/images/instagram.png"
            alt="logo"
            width={40}
            height={40}
          />
          <span className="px-2 text-white text-3xl">Snapgram</span>
        </Link>

        <Link to={`/profile/${user}.id`}
          className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/icons/profile-placeholder.svg'}
            alt='profile-photo'
            className='h-11 w-11 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='text-[18px] font-bold leading-[140%] text-white'>
              {user.name}
            </p>
            <p className='text-[14px] font-normal leading-[140%] text-gray-500'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className='flec flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route
            return (
              <li key ={link.label} className={`transition rounded-lg hover:bg-gray-600 ${isActive && 'bg-gray-600'}`}>
                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4 text-white'
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <button
        onClick={(e) => signOut(e)}
        className='flex gap-4 items-center p-4 text-white hover:bg-gray-600 rounded-lg'>
          <img src="/icons/logout.svg" alt="Logout" />
          <p>Logout</p>
      </button>
    </nav>
  )
}

export default LeftSideBar