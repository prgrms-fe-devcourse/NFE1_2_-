
import Container from '@components/Conatiner/Container';
import { Link} from 'react-router-dom';
import './LoginPage.css';
import Logo from '@assets/imgs/logo.png'

const LoginPage: React.FC = () => {
  
  return (
    <Container>
      <div className="page-wrapper">
   
        <header>
            <img src={Logo} className='logo' alt="Logo" />
        </header>
        <section className="form-section">
          <form className="form">
            <div className="input-wrapper">
              <label htmlFor="username" className="label">아이디</label>
              <input 
                id="username" 
                type="text" 
                className="input"
              
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password" className="label">비밀번호</label>
              <input 
                id="password" 
                type="password" 
                className="input"
              />
            </div>
            <Link to="/join" className="join-link">계정이 없으신가요? <span>회원가입</span></Link>

            <button type="submit" className="submit-button">가입 완료</button>
          </form>
          
        </section>
     
      </div>
    </Container>
  );
};

export default LoginPage;