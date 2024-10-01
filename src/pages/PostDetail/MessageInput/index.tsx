import SendMessageIcon from '@assets/icons/details_send.svg?react'
import BottomModal from '@components/BottomModal/BottomModal'
import './index.css'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

const MessageInput = ({ onClick }: { onClick: () => void }) => {
  const [inputState, setInputState] = useState('')

  const handleMessageInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputState(event.currentTarget.value)
  }

  const handleSubmitMessage = () => {
    console.log(inputState)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmitMessage()
      setInputState('')
    }
  }

  return (
    <BottomModal
      buttonText={'닫기'}
      onClick={onClick}
    >
      <div className='message-input-container'>
        <textarea
          id=''
          name='message'
          placeholder='댓글을 입력해주세요.'
          value={inputState}
          onChange={(event) => handleMessageInput(event)}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <button
          className='send-button'
          onClick={handleSubmitMessage}
        >
          <SendMessageIcon
            width={20}
            height={20}
          />
        </button>
      </div>
    </BottomModal>
  )
}

export default MessageInput
