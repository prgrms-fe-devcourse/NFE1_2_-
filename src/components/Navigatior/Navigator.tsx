import { useNavigate, useLocation } from 'react-router-dom'
import HomeIcon from '@assets/icons/bottom_home.svg?react'
import HomeIconClicked from '@assets/icons/bottom_home_clicked.svg?react'
import SearchIcon from '@assets/icons/bottom_search.svg?react'
import CreatePostIcon from '@assets/icons/bottom_create_post.svg?react'
import MyIcon from '@assets/icons/bottom_my.svg?react'
import MyIconClicked from '@assets/icons/bottom_my_clicked.svg?react'
import './Navigator.css'
import { useAuthStore } from '@/store/authStore'

const Navigator = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn } = useAuthStore()
  const handleNavigation = (path: string) => {
    if (path) {
      navigate(path)
    }
  }

  const handleNavigationAuthUser = (path: string) => {
    if (isLoggedIn) {
      navigate(path)
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className='navigator'>
      <button
        onClick={() => handleNavigation('/')}
        className='nav-button'
      >
        {location.pathname === '/' ? <HomeIconClicked /> : <HomeIcon />}
      </button>

      <button className='nav-button'>
        <SearchIcon />
      </button>

      <button
        onClick={() => handleNavigationAuthUser('/create-post')}
        className='nav-button'
      >
        <CreatePostIcon />
      </button>

      <button
        onClick={() => handleNavigationAuthUser('/my')}
        className='nav-button'
      >
        {location.pathname === '/my' ? <MyIconClicked /> : <MyIcon />}
      </button>
    </nav>
  )
}

export default Navigator
