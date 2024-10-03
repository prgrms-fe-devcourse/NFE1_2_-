import React, { useState } from 'react'
import './JoinPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '@assets/imgs/logo.png'
import JoinDetail from './JoinDetail/JoinDetail'
import Container from '@components/Conatiner/Container'
import { useAuthStore } from '@store/authStore'

const JoinPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValidUsername, setIsValidUsername] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null)
  const [showErrorMessages, setShowErrorMessages] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailInfo, setDetailInfo] = useState<{
    gender: '남' | '여'
    birthDate: string
    mbti: string
  } | null>(null)
  const [detailInfoError, setDetailInfoError] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/
    return usernameRegex.test(username)
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/
    return passwordRegex.test(password)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    setIsValidUsername(validateUsername(value))
    setShowErrorMessages(true)
    setUsernameError('')
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setIsValidPassword(validatePassword(value))
    setPasswordsMatch(value === confirmPassword)
    setShowErrorMessages(true)
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value
    setConfirmPassword(value)
    setPasswordsMatch(value === password)
    setShowErrorMessages(true)
  }

  const calculateAgeGroup = (birthDate: string) => {
    const today = new Date()
    const birthYear = new Date(birthDate).getFullYear()
    const age = today.getFullYear() - birthYear
    const ageGroup = Math.floor(age / 10) * 10
    return ageGroup >= 90 ? '90' : `${ageGroup}`
  }

  const handleDetailSubmit = (
    gender: '남' | '여',
    birthDate: string,
    mbti: string,
  ) => {
    setDetailInfo({ gender, birthDate, mbti })
    setShowDetailModal(false)
    setDetailInfoError(false)
  }

  const checkUsernameAvailability = async (username: string) => {
    try {
      const response = await axios.get(`https://kdt.frontend.5th.programmers.co.kr:5001/check-username?username=${username}`)
      return !response.data.exists // 'exists' 값이 false면 사용 가능한 아이디
    } catch (error) {
      console.error('Error checking username:', error)
      // 에러 발생 시 사용자에게 알림
      alert('아이디 중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.')
      return false // 에러 발생 시 기본적으로 사용 불가능으로 처리
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowErrorMessages(true)
    setDetailInfoError(!detailInfo)

    if (
      !isValidPassword ||
      !isValidUsername ||
      password !== confirmPassword ||
      !detailInfo
    ) {
      return
    }

    const isUsernameAvailable = await checkUsernameAvailability(username)
    if (!isUsernameAvailable) {
      setUsernameError('중복된 아이디입니다')
      return
    }

    const ageGroup = calculateAgeGroup(detailInfo.birthDate)

    const fullNameObject = {
      gender: detailInfo.gender,
      ageGroup,
      mbti: detailInfo.mbti,
    }

    try {
      const response = await axios.post(
        'https://kdt.frontend.5th.programmers.co.kr:5001/signup',
        {
          email: username,
          fullName: JSON.stringify(fullNameObject),
          password,
        }
      )

      if (response.status === 200) {
        // 로컬 스토리지에 id와 토큰 저장
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('token', response.data.token);
        login()// Zustand 스토어의 로그인 상태를 true로 설정
        console.log('Login status:', useAuthStore.getState().isLoggedIn)
        navigate('/joincomplete', { state: { username } }) //회원가입 성공 페이지로 이동
      } else {
        alert(
          `회원가입 실패: ${response.data.message || '알 수 없는 오류가 발생했습니다.'}`
        )
      }
    } catch (error) {
      console.error('Error during signup:', error)
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

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
        <section className='form-section'>
          <form
            className='form'
            onSubmit={handleSubmit}
          >
            <div className='input-wrapper'>
              <label
                htmlFor='username'
                className='label'
              >
                아이디
              </label>
              <input
                id='username'
                type='text'
                className='input'
                placeholder='4~10자의 영문 및 숫자'
                value={username}
                onChange={handleUsernameChange}
                required
              />
              {showErrorMessages && !isValidUsername && (
                <span className='error'>
                  아이디는 4~10자의 영문 및 숫자여야 합니다.
                </span>
              )}
              {showErrorMessages && usernameError && (
                <span className='error'>{usernameError}</span>
              )}
            </div>

            <div className='input-wrapper'>
              <label
                htmlFor='password'
                className='label'
              >
                비밀번호
              </label>
              <input
                id='password'
                type='password'
                className='input'
                placeholder='8~16자의 영문 및 숫자'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {showErrorMessages && !isValidPassword && (
                <span className='error'>
                  비밀번호는 8~16자 영문과 숫자를 포함해야 합니다.
                </span>
              )}
            </div>

            <div className='input-wrapper'>
              <label
                htmlFor='confirm-password'
                className='label'
              >
                비밀번호 확인
              </label>
              <input
                id='confirm-password'
                type='password'
                className='input'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {showErrorMessages &&
                password &&
                confirmPassword &&
                !passwordsMatch && (
                  <span className='error'>비밀번호가 일치하지 않습니다.</span>
                )}
            </div>

            <div className='input-wrapper'>
              {detailInfo && (
                <div className='detail-info-display'>
                  <p><span>MBTI</span> <span>{detailInfo.mbti}</span></p>
                  <p><span>성별</span> <span>{detailInfo.gender}</span></p>
                  <p><span>나이</span> <span>{detailInfo.birthDate}</span></p>                  
                </div>
              )}
              <button
                type='button'
                className={`details-button ${detailInfo ? 'details-button-edit' : ''}`}
                onClick={() => setShowDetailModal(true)}
              >
                {detailInfo ? '상세정보 수정' : '상세정보 선택'}
              </button>
              {showErrorMessages && detailInfoError && (
                <span className='error'>상세정보를 입력해주세요.</span>
              )}
            </div>

            <Link
              to='/login'
              className='join-link'
            >
              계정이 있으신가요? <span>로그인</span>
            </Link>
            <button
              type='submit'
              className='submit-button'
            >
              회원가입
            </button>
          </form>
        </section>

        {showDetailModal && (
          <JoinDetail
            onSubmit={handleDetailSubmit}
            onClose={() => setShowDetailModal(false)}
          />
        )}
      </div>
    </Container>
  )
}

export default JoinPage