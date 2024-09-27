import { useState } from 'react'
import BottomModal from '@/components/BottomModal/BottomModal'
import '../MyPage.css'

const OtherSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const isDeleteInputFilled = deletePassword

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setDeletePassword('')
  }

  return (
    <div className='card'>
      <p className='title'>기타</p>
      <button
        onClick={handleOpenModal}
        className='item'
      >
        회원탈퇴
      </button>
      {isModalOpen && (
        <BottomModal
          onClick={handleCloseModal}
          buttonText={isDeleteInputFilled ? '확인' : '닫기'}
        >
          <div className='modal-section'>
            <p className='instruction'>탈퇴 하시겠습니까?</p>
            <div className='inner-section'>
              <p className='label'>비밀번호 확인</p>
              <input
                type='password'
                className='input'
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
            </div>
          </div>
        </BottomModal>
      )}
      <p className='item'>로그아웃</p>
    </div>
  )
}

export default OtherSection
