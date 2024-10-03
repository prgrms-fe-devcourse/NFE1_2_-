import { useEffect, useState } from 'react'
import PrevButton from '@/assets/icons/back_button.svg?react'
import NextButton from '@/assets/icons/next_button.svg?react'
import Notification from '@/assets/icons/list_notification.svg?react'
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    )
  }

  //카테고리 클릭하면 해당 글 목록 보여줌, 전체 선택하면 카테고리 선택 X
  const handleImageClick = (category: string) => {
    if (category === '전체') {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
    }
  }

  return (
    <div className='list-header'>
      <div className='notification'>
        <Notification />
      </div>
      <div className='carousel'>
        <PrevButton
          className='carousel-button'
          onClick={handlePrev}
        />
        <div
          className='image-wrapper'
          style={{ transform: `translateX(-${currentIndex * 250}px)` }}
        >
          {images.map((image, index) => (
            <button
              className={`image-container ${currentIndex === index ? 'active' : ''}`}
              key={index}
              onClick={() => handleImageClick(image.category)}
            >
              <img
                className='img'
                src={image.src}
                alt={image.alt}
                width={170}
                height={80}
              />
              <div className='text-overlay'>{image.alt}</div>
            </button>
          ))}
        </div>
        <NextButton
          className='carousel-button'
          onClick={handleNext}
        />
      </div>
    </div>
  )
}

export default Carousel
