import { useState } from 'react'
import ModalComponent from '../Component/ModalComponent/ModalComponent'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'

interface SectionProps {
  isModalOpen: boolean
  onChangeOpenModal: () => void
  onChangeCloseModal: () => void
}

const OtherSection = (props: SectionProps) => {
  const { isModalOpen, onChangeOpenModal, onChangeCloseModal } = props
  const [deletePassword, setDeletePassword] = useState('')

  const handleCloseModal = () => {
    onChangeCloseModal()
    setDeletePassword('')
  }

  return (
    <>
    <InfoSection title='기타'>
      <button
        className='info-item'
        onClick={onChangeOpenModal}
      >
        회원탈퇴
      </button>
      
      <p className='info-item'>로그아웃</p>
    </InfoSection>
    {isModalOpen && (
      <ModalComponent
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
    )}
    </>
  )
}

export default OtherSection
