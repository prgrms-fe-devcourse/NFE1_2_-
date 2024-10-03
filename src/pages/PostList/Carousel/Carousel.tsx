import { useState } from 'react'
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
  // currentIndex 상태는 더 이상 필요하지 않으므로 삭제
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
        <div className='image-wrapper'>
          {images.map((image, index) => (
            <button
              className={`image-container`}
              key={index}
              onClick={() => handleImageClick(image.category)}
            >
              <img
                className='img'
                src={image.src}
                alt={image.alt}
                width={140}
                height={80}
              />
              <div className='text-overlay'>{image.alt}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
