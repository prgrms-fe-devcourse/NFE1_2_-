import React, { useState } from 'react'
import './JoinPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '@assets/imgs/logo.png'
import JoinDetail from './JoinDetail/JoinDetail'
import Container from '@components/Conatiner/Container'

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

  // 아이디 유효성 검사 (4~10자의 영문 및 숫자)
  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/
    return usernameRegex.test(username)
  }

  // 비밀번호 유효성 검사 (8~16자의 영문과 숫자 포함)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/
    return passwordRegex.test(password)
  }

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    setIsValidUsername(validateUsername(value))
    setShowErrorMessages(true)

    if (validateUsername(value)) {
      try {
        const response = await axios.get(`https://kdt.frontend.5th.programmers.co.kr:5001/check-username?username=${value}`)
        if (response.data.exists) {
          setUsernameError('이미 존재하는 아이디입니다')
        } else {
          setUsernameError('')
        }
      } catch (error) {
        console.error('Error checking username:', error)
      }
    }
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
        navigate('/joincomplete', { state: { username } })
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
    <Container pageName="join">
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
            <button
              type='button'
              className='details-button'
              onClick={() => setShowDetailModal(true)}
            >
              상세정보 선택
            </button>
            {showErrorMessages && detailInfoError && (
              <span className='error'>상세정보를 입력해주세요.</span>
            )}
          </div>

          <Link
            to='/loginpage'
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