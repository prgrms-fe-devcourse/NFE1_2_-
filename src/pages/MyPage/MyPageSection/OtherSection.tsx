import { useState } from 'react'
import ModalSection from '../Component/ModalSection'
import Section from '../Component/Section'
import '../MyPage.css'

const OtherSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setDeletePassword('')
  }

  const inputFields = [
    {
      label: '비밀번호 확인',
      value: deletePassword,
      onChange: (e) => setDeletePassword(e.target.value),
      type: 'password',
    },
  ]

  return (
    <Section title='기타'>
      <button
        onClick={handleOpenModal}
        className='item'
      >
        회원탈퇴
      </button>
      <ModalSection
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buttonText={deletePassword ? '확인' : '닫기'}
        instruction='탈퇴 하시겠습니까?'
        inputFields={inputFields}
      />
      <p className='item'>로그아웃</p>
    </Section>
  )
}

export default OtherSection
