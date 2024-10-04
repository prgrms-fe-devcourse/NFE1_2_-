import { useNavigate, useLocation } from 'react-router-dom'
import HomeIcon from '@assets/icons/bottom_home.svg?react'
import HomeIconClicked from '@assets/icons/bottom_home_clicked.svg?react'
import SearchIcon from '@assets/icons/bottom_search.svg?react'
import CreatePostIcon from '@assets/icons/bottom_create_post.svg?react'
import MyIcon from '@assets/icons/bottom_my.svg?react'
import MyIconClicked from '@assets/icons/bottom_my_clicked.svg?react'
import './Navigator.css'
import { getAuthUser } from '@utils/api'
import { useSearchContext } from '@/utils/SearchContext'

const Navigator = () => {
  const { setIsSearchModalOpen } = useSearchContext()

  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path: string) => {
    if (path) {
      navigate(path)
    }
  }

  const handleNavigationAuthUser = (path: string) => {
    getAuthUser().then((user) => {
      if (user) {
        navigate(path)
      } else {
        navigate('/login')
      }
    })
  }

  return (
    <nav className='navigator'>
      <button
        onClick={() => handleNavigation('/')}
        className='nav-button'
      >
        {location.pathname === '/' ? <HomeIconClicked /> : <HomeIcon />}
      </button>

      <button
        className='nav-button'
        onClick={() => setIsSearchModalOpen(true)} // 모달 열기
      >
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
