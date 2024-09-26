import LikeIcon from '@assets/icons/heart_before_select.svg?react'
import './LikeButton.css'
const LikeButton = () => {
  return (
    <div className='like-btn-container'>
      <button className='like-btn'>
        <LikeIcon
          width={40}
          height={40}
        />
      </button>
      <p>1</p>
    </div>
  )
}

export default LikeButton
