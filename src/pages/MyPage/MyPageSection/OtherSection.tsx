import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalComponent from '../Component/ModalComponent/ModalComponent'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'
import { useAuthStore } from '@/store/authStore'
import { verifyPassword, withdrawUser } from '@/utils/api'

interface SectionProps {
  isModalOpen: boolean
  onChangeOpenModal: () => void
  onChangeCloseModal: () => void
}

const OtherSection: React.FC<SectionProps> = ({
  isModalOpen,
  onChangeOpenModal,
  onChangeCloseModal
}) => {
  const [deletePassword, setDeletePassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [withdrawalConfirmed, setWithdrawalConfirmed] = useState(false)
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleCloseModal = useCallback(() => {
    onChangeCloseModal()
    setDeletePassword('')
    setPasswordError('')
    setWithdrawalConfirmed(false)
  }, [onChangeCloseModal])

  const handleConfirmWithdrawal = async () => {
    try {
      const isValid = await verifyPassword(deletePassword)
      if (isValid) {
        setWithdrawalConfirmed(true)
      } else {
        setPasswordError('비밀번호를 확인해주세요')
      }
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error)
      setPasswordError('비밀번호 확인 중 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const handleFinalWithdrawal = async () => {
    try {
      await withdrawUser()
      logout()
      navigate('/')
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error)
      setPasswordError('회원 탈퇴 처리 중 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const handleModalAction = useCallback(async () => {
    if (withdrawalConfirmed) {
      await handleFinalWithdrawal()
    } else {
      await handleConfirmWithdrawal()
    }
  }, [withdrawalConfirmed])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const buttonText = useMemo(() => {
    if (withdrawalConfirmed) {return '확인'}
    return deletePassword ? '확인' : '닫기'
  }, [withdrawalConfirmed, deletePassword])

  const instruction = useMemo(() => {
    if (withdrawalConfirmed) {return '회원탈퇴가 완료되었습니다.'}
    return '탈퇴 하시겠습니까?'
  }, [withdrawalConfirmed])

  return (
    <>
      <InfoSection title='기타'>
        <button className='info-item' onClick={onChangeOpenModal}>
          회원탈퇴
        </button>
        <button className='info-item' onClick={handleLogout}>로그아웃</button>
      </InfoSection>
      {isModalOpen && (
        <ModalComponent
          onClose={withdrawalConfirmed ? handleCloseModal : handleModalAction}
          buttonText={buttonText}
          instruction={instruction}
        >
          {!withdrawalConfirmed ? (
            <>
              <p className='modal-label'>비밀번호 확인</p>
              <input
                type='password'
                className='modal-input'
                value={deletePassword}
                onChange={(e) => {
                  setDeletePassword(e.target.value)
                  setPasswordError('')
                }}
              />
              {passwordError && <p className='error-message'>{passwordError}</p>}
            </>
          ) : (
            <p>그동안 VOTESOLVE를 이용해주셔서 감사합니다.</p>
          )}
        </ModalComponent>
      )}
    </>
  )
}

export default OtherSection