import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ModalComponent from '../Component/ModalComponent/ModalComponent'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'
import { User } from '@/typings/types'
import { logoutUser } from '@/utils/api'
import { useAuthStore } from '@/store/authStore'

interface SectionProps {
  userData: User
  isModalOpen: boolean
  onChangeOpenModal: () => void
  onChangeCloseModal: () => void
}

const OtherSection = (props: SectionProps) => {
  const { userData, isModalOpen, onChangeOpenModal, onChangeCloseModal } = props
  const [deletePassword, setDeletePassword] = useState('')
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout) 

  const handleCloseModal = () => {
    onChangeCloseModal()
    setDeletePassword('')
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()  // zustand저장소 logout() 호출
      navigate('/')
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error)
      toast.error('로그아웃 중 오류가 발생하였습니다', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
        
        <button className='info-item' onClick={handleLogout}>로그아웃</button>
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