import { useState } from 'react'
import Container from '@components/Conatiner/Container'
import Navigator from '@/components/Navigatior/Navigator'
import BottomModal from '@/components/BottomModal/BottomModal'
import './MyPage.css'
const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <Container>
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
            onClick={handleOpenModal}
          >
            비밀번호 변경
          </button>
          {isModalOpen && (
            <BottomModal
              onClick={handleCloseModal}
              buttonText='닫기'
            >
              <div className='modal-section'>
                <p className='instruction'>새로운 비밀번호를 입력해주세요!</p>
                <div className='inner-section'>
                  <p className='label'>기존 비밀번호</p>
                  <input
                    type='password'
                    placeholder=''
                    className='input'
                  />
                </div>
                <div>
                  <p className='label'>새로운 비밀번호</p>
                  <input
                    type='password'
                    placeholder='8~16글자의 영문, 숫자만 입력해주세요'
                    className='input'
                  />
                </div>
                <div>
                  <p className='label'>비밀번호 확인</p>
                  <input
                    type='password'
                    placeholder='8~16글자의 영문, 숫자만 입력해주세요'
                    className='input'
                  />
                </div>
              </div>
            </BottomModal>
          )}
        </div>
        <div className='section'>
          <p className='title'>기타</p>
          <p className='item'>회원탈퇴</p>
          <p className='item'>로그아웃</p>
        </div>
      </section>

      {/* <Navigator /> */}
    </Container>
  )
}

export default MyPage
