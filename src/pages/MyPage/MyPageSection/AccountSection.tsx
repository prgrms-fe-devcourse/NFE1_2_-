import { useEffect, useState } from 'react'
import ModalComponent from '../Component/ModalComponent/ModalComponent'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'
import { User } from '@/typings/types'
import { updateUserPassword } from '@/utils/api'

interface SectionProps {
  userData: User | undefined
  isModalOpen: boolean
  onChangeOpenModal: () => void
  onChangeCloseModal: () => void
}
const AccountSection = (props: SectionProps) => {
  const { userData, isModalOpen, onChangeOpenModal, onChangeCloseModal } = props
  const email = userData?.email

  const [newPassword, setNewPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState<boolean>(true)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false)

  const handleCloseModal = () => {
    onChangeCloseModal()
    updateUserPassword(newPassword)
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/
    setNewPassword(e.target.value)
    setCheckPassword(passwordRegex.test(e.target.value))
  }

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  useEffect(() => {
    if (newPassword && confirmPassword) {
      setIsConfirmPassword(newPassword === confirmPassword)
    }
  }, [newPassword, confirmPassword])
  return (
    <>
      <InfoSection title='계정'>
        <p className='info-item'>
          아이디<span className='value'>{email}</span>
        </p>
        <button
          className='info-item'
          onClick={() => onChangeOpenModal()}
        >
          비밀번호 변경
        </button>
      </InfoSection>
      {isModalOpen && (
        <ModalComponent
          onClose={handleCloseModal}
          buttonText={isConfirmPassword ? '확인' : '닫기'}
          instruction='새로운 비밀번호를 입력해주세요!'
        >
          <p className='modal-label'>새로운 비밀번호</p>
          <input
            type='password'
            className='modal-input'
            placeholder='8~16자의 영문 및 숫자'
            value={newPassword} //추후 지우기
            onChange={handleChangePassword}
          />
          {!checkPassword && (
            <p className='modal-error-text'>
              비밀번호는 8~16자 영문과 숫자를 포함해야 합니다.
            </p>
          )}
          <p className='modal-label'>비밀번호 확인</p>
          <input
            type='password'
            className='modal-input'
            placeholder='8~16자의 영문 및 숫자'
            value={confirmPassword} //추후 지우기
            onChange={handleConfirmPassword}
          />
          {confirmPassword && !isConfirmPassword && (
            <p className='modal-error-text'>비밀번호가 일치하지 않습니다.</p>
          )}
        </ModalComponent>
      )}
    </>
  )
}

export default AccountSection
