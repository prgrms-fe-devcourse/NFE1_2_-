import { useState, useRef, useEffect } from 'react'
import Notification from '@/assets/icons/list_notification.svg?react'
import NextButton from '@/assets/icons/next_button.svg?react'
import BackButton from '@/assets/icons/back_button.svg?react'
import { useNavigate } from 'react-router-dom'
import './Carousel.css'

const images = [
  { src: 'src/assets/imgs/전체.png', alt: '전체', category: '전체' },
  { src: 'src/assets/imgs/이별.jpg', alt: '이별', category: '이별' },
  { src: 'src/assets/imgs/짝사랑.jpg', alt: '짝사랑', category: '짝사랑' },
  { src: 'src/assets/imgs/썸.png', alt: '썸', category: '썸' },
  { src: 'src/assets/imgs/데이트.jpg', alt: '데이트', category: '데이트' },
  { src: 'src/assets/imgs/기타.jpg', alt: '기타', category: '기타' },
]

const Carousel = ({
  setSelectedCategory,
}: {
  setSelectedCategory: (category: string | null) => void
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [clickedImageIndex, setClickedImageIndex] = useState<number | null>(
    null,
  )
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleImageClick = (category: string, index: number) => {
    setClickedImageIndex(index)
    if (category === '전체') {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
    }
  }

  const showImages = () => {
    return images.map((image, index) => (
      <button
        className='carousel-image-container'
        key={index}
        onClick={() => handleImageClick(image.category, index)}
      >
        <img
          className={`carousel-img ${clickedImageIndex === index ? 'clicked' : ''}`}
          src={image.src}
          alt={image.alt}
          width={140}
          height={80}
        />
        <div className='carousel-text-overlay'>{image.alt}</div>
      </button>
    ))
  }

  const nextSlide = () => {
    if (isTransitioning || currentIndex === 3) {
      return
    }
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex + 3)
  }

  const prevSlide = () => {
    if (isTransitioning || currentIndex === 0) {
      return
    }
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex - 3)
  }

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = 160 + 10
      carouselRef.current.style.transition = 'transform 0.3s ease-in-out'
      carouselRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`
    }

    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [currentIndex])

  const navigate = useNavigate()

  return (
    <div className='carousel-list-header'>
      <button
        className='carousel-notification'
        onClick={() => navigate('/notification')}
      >
        <Notification
          width={28}
          height={28}
        />
      </button>
      <div className='carousel-container'>
        {currentIndex !== 0 && (
          <button
            onClick={prevSlide}
            className='carousel-nav-button carousel-prev'
          >
            <BackButton />
          </button>
        )}
        <div className='carousel-viewport'>
          <div
            className='carousel-image-wrapper'
            ref={carouselRef}
          >
            {showImages()}
          </div>
        </div>
        {currentIndex !== 3 && (
          <button
            onClick={nextSlide}
            className='carousel-nav-button carousel-next'
          >
            <NextButton />
          </button>
        )}
      </div>
    </div>
  )
}

export default Carousel
