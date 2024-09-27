import { useState } from 'react'
import ModalSection from '../Component/ModalSection'
import Section from '../Component/Section'
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
      onChange: (e) => setOldPassword(e.target.value),
      type: 'password',
    },
    {
      label: '새로운 비밀번호',
      value: newPassword,
      onChange: (e) => setNewPassword(e.target.value),
      type: 'password',
    },
    {
      label: '비밀번호 확인',
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      type: 'password',
    },
  ]

  return (
    <Section title='계정'>
      <p className='item'>
        아이디<span className='value'>djfkd</span>
      </p>
      <button
        className='item'
        onClick={handleOpenModal}
      >
        비밀번호 변경
      </button>
      <ModalSection
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buttonText={
          oldPassword || newPassword || confirmPassword ? '확인' : '닫기'
        }
        instruction='새로운 비밀번호를 입력해주세요!'
        inputFields={inputFields}
      />
    </Section>
  )
}

export default AccountSection
