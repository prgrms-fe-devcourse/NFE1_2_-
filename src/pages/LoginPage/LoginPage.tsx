import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout';
import './LoginPage.css';
import Logo from '@assets/imgs/logo.png';
import { useAuthStore } from '@store/authStore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
     // 이미 로그인되어 있다면 홈페이지로 리다이렉트
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

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
      const response = await axios.post('https://kdt.frontend.5th.programmers.co.kr:5001/login', {
        email,
        password
      });
      // 로컬 스토리지에 id와 토큰 저장
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('token', response.data.token);
      login();// Zustand 스토어의 로그인 상태를 true로 설정
      // 포스트페이지로 이동
      navigate('/');
    } catch (error) {
      // 로그인 실패 시 에러 메시지 설정
      console.error('로그인 오류:', error);
      setEmailError('아이디를 확인해주세요');
      setPasswordError('비밀번호를 확인해주세요');
    }
  };

  return (
    <DetailPageLayout>
      <div className="page-wrapper">
        <header>
          <img src={Logo} className='logo-login' alt="Logo" />
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
            <button type="submit" className="submit-button-login">로그인</button>
          </form>
        </section>
      </div>
    </DetailPageLayout>
  );
};

export default LoginPage;