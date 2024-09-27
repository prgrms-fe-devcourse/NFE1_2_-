import { useState } from 'react'
import BottomModal from '@/components/BottomModal/BottomModal'
import './MyPage.css'
import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModalType, setCurrentModalType] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [deletePassword, setDeletePassword] = useState('')

  const handleOpenModal = (modalType) => {
    setCurrentModalType(modalType)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setDeletePassword('')
  }

  const isPasswordInputFilled = oldPassword || newPassword || confirmPassword
  const isDeleteInputFilled = deletePassword

  return (
    <MainPageLayout>
      <section>
        <div className='user-info'>
          <p className='info-title'>내 정보</p>
        </div>
        <div className='section'>
          <p className='title'>프로필</p>
          <p className='item'>
            MBTI<span className='value'>istp</span>
          </p>
          <p className='item'>
            성별<span className='value'>여</span>
          </p>
          <p className='item'>
            나이<span className='value'>20대</span>
          </p>
          <div className='edit'>프로필 수정</div>
        </div>
        <div className='section'>
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
                    placeholder=''
                    className='input'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <p className='check'>비밀번호를 확인해주세요</p>
                </div>
                <div>
                  <p className='label'>새로운 비밀번호</p>
                  <input
                    type='password'
                    placeholder='8~16글자의 영문, 숫자만 입력해주세요'
                    className='input'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <p className='label'>비밀번호 확인</p>
                  <input
                    type='password'
                    placeholder='8~16글자의 영문, 숫자만 입력해주세요'
                    className='input'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <p className='check'>비밀번호를 확인해주세요</p>
                </div>
              </div>
            </BottomModal>
          )}
        </div>
        <div className='section'>
          <p className='title'>기타</p>
          <button
            className='item'
            onClick={() => handleOpenModal('accountDelete')}
          >
            회원탈퇴
          </button>
          {isModalOpen && currentModalType === 'accountDelete' && (
            <BottomModal
              onClick={handleCloseModal}
              buttonText={isDeleteInputFilled ? '확인' : '닫기'}
            >
              <div className='modal-section'>
                <p className='instruction'>탈퇴 하시겠습니까?</p>
                <div className='inner-section'>
                  <p className='label'>비밀번호 확인</p>
                  <input
                    type='password'
                    placeholder=''
                    className='input'
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                  />
                  <p className='check'>비밀번호를 확인해주세요</p>
                </div>
              </div>
            </BottomModal>
          )}
          <p className='item'>로그아웃</p>
        </div>
      </section>
    </MainPageLayout>
  )
}

export default MyPage
