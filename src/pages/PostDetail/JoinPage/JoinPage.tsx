import React, { useState } from 'react';
import './JoinPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@assets/imgs/logo.png';

const JoinPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const navigate = useNavigate(); 

  // 아이디 유효성 검사 (4~10자의 영문 및 숫자)
  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;
    return usernameRegex.test(username);
  };

  // 비밀번호 유효성 검사 (8~16자의 영문과 숫자 포함)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setIsValidUsername(validateUsername(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsValidPassword(validatePassword(value));
    setPasswordsMatch(null);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrorMessages(true); 
    if (password !== confirmPassword || !isValidPassword || !isValidUsername) {
      setPasswordsMatch(false); 
    } else {
        navigate('/joincomplete'); // 회원가입 완료 페이지로 이동
    }
  };

  return (
    <div className="join-page-wrapper">
      <header>
        <img src={Logo} className='logo' alt="Logo" />
      </header>
      <section className="form-section">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username" className="label">아이디</label>
            <input 
              id="username"
              type="text"
              className="input"
              placeholder="4~10자의 영문 및 숫자"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            {showErrorMessages && !isValidUsername && (
              <span className="error">아이디는 4~10자의 영문 및 숫자여야 합니다.</span>
            )}
          </div>
          
          <div className="input-wrapper">
            <label htmlFor="password" className="label">비밀번호</label>
            <input 
              id="password" 
              type="password" 
              className="input"
              placeholder="8~16자의 영문 및 숫자"
              value={password}
              onChange={handlePasswordChange}
              required 
            />
            {showErrorMessages && !isValidPassword && (
              <span className="error">비밀번호는 8~16자 영문과 숫자를 포함해야 합니다.</span>
            )}
          </div>

          <div className="input-wrapper">
            <label htmlFor="confirm-password" className="label">비밀번호 확인</label>
            <input 
              id="confirm-password" 
              type="password" 
              className="input"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required 
            />
            {showErrorMessages && !passwordsMatch && (
              <span className="error">비밀번호가 일치하지 않습니다.</span>
            )}
          </div>

          <button type="button" className="details-button">상세정보 선택</button>

          <Link to="/loginpage" className="join-link">계정이 있으신가요? <span>로그인</span></Link>
          <button type="submit" className="submit-button">회원가입</button>
        </form>
       
      </section>
    </div>
  );
};

export default JoinPage;
