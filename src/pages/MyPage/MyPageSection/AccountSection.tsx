import { useState } from 'react'
import ModalComponent from '../Component/ModalComponent/ModalComponent'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'

const AccountSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const inputFields = [
    {
      label: '기존 비밀번호',
      value: oldPassword,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setOldPassword(e.target.value),
      type: 'password',
    },
    {
      label: '새로운 비밀번호',
      value: newPassword,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewPassword(e.target.value),
      type: 'password',
    },
    {
      label: '비밀번호 확인',
      value: confirmPassword,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
      type: 'password',
    },
  ]

  return (
    <InfoSection title='계정'>
      <p className='info-item'>
        아이디<span className='value'>djfkd</span>
      </p>
      <button
        className='info-item'
        onClick={handleOpenModal}
      >
        비밀번호 변경
      </button>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buttonText={
          oldPassword || newPassword || confirmPassword ? '확인' : '닫기'
        }
        instruction='새로운 비밀번호를 입력해주세요!'
        inputFields={inputFields}
      />
    </InfoSection>
  )
}

export default AccountSection
