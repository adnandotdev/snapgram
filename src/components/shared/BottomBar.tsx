import { bottombarLinks } from '@/constants'
import { INavLink } from '@/types'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
  const { pathname } = useLocation()
  
  return (
    <section className='flex justify-between z-50 w-full sticky bottom-0 rounded-t-[20px] bg-gray-800 px-3 py-2 md:hidden
    '>
        {bottombarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route
          return (
              <Link
                to={link.route}
                key={link.label}
                className={`transition rounded-lg p-2 flex flex-col items-center hover:bg-gray-600 ${isActive && 'bg-gray-600'}`}
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                />
                <p className='text-xs'>{link.label}</p>
              </Link>
          )
        })}
    </section>


  )
}

export default BottomBar

{/* <ul className='flex flex-wrap justify-between gap-2 md:gap-4"'>
{bottombarLinks.map((link: INavLink) => {
  const isActive = pathname === link.route
  return (
    <li key={link.label} className={`rounded-lg hover:bg-gray-600 ${isActive && 'bg-gray-600'}`}>
      <NavLink
        to={link.route}
        className='flex gap-4 items-center p-4 text-white'
      >
        <img
          src={link.imgURL}
          alt={link.label}
        />
      </NavLink>
    </li>
  )
})}
</ul>
</section> */}