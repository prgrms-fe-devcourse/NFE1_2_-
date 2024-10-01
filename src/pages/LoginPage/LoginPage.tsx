import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@components/Conatiner/Container';
import './LoginPage.css';
import Logo from '@assets/imgs/logo.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // 이메일 입력 처리
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  // 비밀번호 입력 처리
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 에러 메시지 초기화
    setEmailError('');
    setPasswordError('');

    // 입력값 유효성 검사
    if (!email) {
      setEmailError('아이디를 입력해주세요');
    }
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
    }
    if (!email || !password) {
      return;
    }

    try {
      const response = await fetch('https://kdt.frontend.5th.programmers.co.kr:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // 로컬 스토리지에 id와 JWT 토큰 저장
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('token', data.token);
        // 포스트페이지로 이동
        navigate('/');
      } else {
        // 로그인 실패 시 에러 메시지 설정
        setEmailError('아이디를 확인해주세요');
        setPasswordError('비밀번호를 확인해주세요');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setEmailError('로그인 중 오류가 발생했습니다');
      setPasswordError('다시 시도해 주세요');
    }
  };

  return (
    <Container>
      <div className="page-wrapper">
        <header>
          <img src={Logo} className='logo' alt="Logo" />
        </header>
        <section className="form-section">
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email" className="label">아이디</label>
              <input 
                id="email" 
                type="text" 
                className="input"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <span className="error">{emailError}</span>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password" className="label">비밀번호</label>
              <input 
                id="password" 
                type="password" 
                className="input"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <Link to="/join" className="join-link">계정이 없으신가요? <span>회원가입</span></Link>
            <button type="submit" className="submit-button">로그인</button>
          </form>
        </section>
      </div>
    </Container>
  );
};

export default LoginPage;