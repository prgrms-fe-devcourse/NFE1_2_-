import { useState } from 'react'
import BottomModal from '@/components/BottomModal/BottomModal'
import '../MyPage.css'

const AccountSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModalType, setCurrentModalType] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOpenModal = (modalType: any) => {
    setCurrentModalType(modalType)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const isPasswordInputFilled = oldPassword || newPassword || confirmPassword

  return (
    <div className='card'>
      <p className='title'>계정</p>
      <p className='item'>
        아이디<span className='value'>djfkd</span>
      </p>
      <button
        className='item'
        onClick={() => handleOpenModal('passwordChange')}
      >
        비밀번호 변경
      </button>
      {isModalOpen && currentModalType === 'passwordChange' && (
        <BottomModal
          onClick={handleCloseModal}
          buttonText={isPasswordInputFilled ? '확인' : '닫기'}
        >
          <div className='modal-section'>
            <p className='instruction'>새로운 비밀번호를 입력해주세요!</p>
            <div className='inner-section'>
              <p className='label'>기존 비밀번호</p>
              <input
                type='password'
                className='input'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <p className='label'>새로운 비밀번호</p>
              <input
                type='password'
                className='input'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <p className='label'>비밀번호 확인</p>
              <input
                type='password'
                className='input'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </BottomModal>
      )}
    </div>
  )
}

export default AccountSection