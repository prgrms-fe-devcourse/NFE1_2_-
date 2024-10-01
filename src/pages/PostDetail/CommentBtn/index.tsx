import CommentBtnIcon from '@assets/icons/details_comments_btn.svg?react'
import './index.css'
const CommentBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className='message-btn'
      onClick={onClick}
    >
      <CommentBtnIcon
        width={35}
        height={35}
      />
    </button>
  )
}

export default CommentBtn