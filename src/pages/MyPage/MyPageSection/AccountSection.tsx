import { useState } from 'react'
import ModalComponent from '../Component/ModalComponent/ModalComponent'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'

interface SectionProps {
  isModalOpen: boolean
  onChangeOpenModal: () => void
  onChangeCloseModal: () => void
}

const AccountSection = (props: SectionProps) => {
  const { isModalOpen, onChangeOpenModal, onChangeCloseModal } = props
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleCloseModal = () => {
    onChangeCloseModal()
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <InfoSection title='계정'>
      <p className='info-item'>
        아이디<span className='value'>djfkd</span>
      </p>
      <button
        className='info-item'
        onClick={onChangeOpenModal}
      >
        비밀번호 변경
      </button>
      {isModalOpen && (
        <ModalComponent
          onClose={handleCloseModal}
          buttonText={
            oldPassword || newPassword || confirmPassword ? '확인' : '닫기'
          }
          instruction='새로운 비밀번호를 입력해주세요!'
        >
          <p className='modal-label'>기존 비밀번호</p>
          <input
            type='password'
            className='modal-input'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <p className='modal-label'>새로운 비밀번호</p>
          <input
            type='password'
            className='modal-input'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className='modal-label'>비밀번호 확인</p>
          <input
            type='password'
            className='modal-input'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </ModalComponent>
      )}
    </InfoSection>
  )
}

export default AccountSection
