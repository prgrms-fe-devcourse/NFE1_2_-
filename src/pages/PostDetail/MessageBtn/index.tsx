import MessageBtnIcon from '@assets/icons/details_comments_btn.svg?react'
import './index.css'
const MessageBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className='message-btn'
      onClick={onClick}
    >
      <MessageBtnIcon
        width={35}
        height={35}
      />
    </button>
  )
}

export default MessageBtn
