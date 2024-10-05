import { useState, useEffect } from 'react'
import Notification from '@/assets/icons/list_notification.svg?react'
import { useNavigate } from 'react-router-dom'
import LogoImg from '@assets/imgs/VS.png'
import './Carousel.css'

const Carousel = ({
  setSelectedCategory,
  resetClickedImageIndex,
}: {
  setSelectedCategory: (category: string | null) => void
  resetClickedImageIndex: boolean // prop 타입 설정
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const categoryList = ['전체', '이별', '짝사랑', '썸', '데이트', '기타']

  const handleICategoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentCategory = e.currentTarget.textContent
    const currentIndex = parseInt(e.currentTarget.dataset.index as string)

    setCurrentIndex(currentIndex)

    if (currentCategory === '전체' || currentCategory === null) {
      setCurrentIndex(0)
      setSelectedCategory(null)
    } else {
      setSelectedCategory(currentCategory as string)
    }
  }

  useEffect(() => {
    if (resetClickedImageIndex) {
      setCurrentIndex(0) // 전체 버튼 초기화
      setSelectedCategory(null) // 전체 버튼 선택 시 category null 설정
    }
  }, [resetClickedImageIndex, setSelectedCategory])

  const navigate = useNavigate()

  return (
    <nav className='main-post-nav'>
      <div className='carousel-list-header'>
        <h1 className='nav-log-img'>
          <img src={LogoImg} />
        </h1>
        <button
          className='carousel-notification'
          onClick={() => navigate('/notification')}
        >
          <Notification
            width={28}
            height={28}
          />
        </button>
      </div>
      <ul className='filter-list'>
        {categoryList.map((category, index) => (
          <li
            key={category}
            className={currentIndex === index ? 'filter-activate' : ''}
          >
            <a
              onClick={handleICategoryClick}
              data-index={index}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Carousel
