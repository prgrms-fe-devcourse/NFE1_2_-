import { useState } from 'react'
import ModalComponent from '../Component/ModalComponent/ModalComponent'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'

const OtherSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setDeletePassword('')
  }

  return (
    <InfoSection title='기타'>
      <button
        className='info-item'
        onClick={handleOpenModal}
      >
        회원탈퇴
      </button>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buttonText={deletePassword ? '확인' : '닫기'}
        instruction='탈퇴 하시겠습니까?'
      >
        <p className='modal-label'>비밀번호 확인</p>
        <input
          type='password'
          className='modal-input'
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
        />
      </ModalComponent>
      <p className='info-item'>로그아웃</p>
    </InfoSection>
  )
}

export default OtherSection
