import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '@assets/imgs/logo.png'
import Container from '@components/Conatiner/Container'
import './JoinCompletePage.css'

const JoinCompletePage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const username = location.state?.username || ''

  return (
    <Container>
      <div className='join-page-wrapper'>
        <header>
          <img
            src={Logo}
            className='logo'
            alt='Logo'
          />
        </header>
        <section className='content-section'>
          <div className='welcome-message-container'>
            <div className='welcome-message'>
              <h2>{username}님</h2>
              <p>
                <span className='logo-text'>VOTE SOLVE</span>에 오신걸
                환영합니다!
              </p>
            </div>
            <div className='completion-message'>
              <p>가입이 완료되었습니다.</p>
              <p>확인버튼을 누르시면 메인으로 이동합니다.</p>
            </div>
          </div>

          <button
            className='submit-button'
            onClick={() => navigate('/')}
          >
            확인
          </button>
        </section>
      </div>
    </Container>
  )
}

export default JoinCompletePage
