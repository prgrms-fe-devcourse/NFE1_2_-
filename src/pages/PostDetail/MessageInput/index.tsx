import SendMessageIcon from '@assets/icons/details_send.svg?react'
import BottomModal from '@components/BottomModal/BottomModal'
import './index.css'

const MessageInput = ({ onClick }: { onClick: () => void }) => {
  return (
    <BottomModal
      buttonText={'닫기'}
      onClick={onClick}
    >
      <div className='message-input-container'>
        <textarea
          name='message'
          placeholder='댓글을 입력해주세요.'
          id=''
        />
        <button className='send-button'>
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
