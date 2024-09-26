import MessageBtnIcon from '@assets/icons/details_comments_btn.svg?react'
import './MessageBtn.css'
const MessageBtn = () => {
  return (
    <button className='message-btn'>
      <MessageBtnIcon
        width={40}
        height={40}
      />
    </button>
  )
}

export default MessageBtn
