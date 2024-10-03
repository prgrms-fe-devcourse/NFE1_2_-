import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@assets/imgs/logo.png';
import './SplashScreen.css';
import Container from '@components/Conatiner/Container'

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
      navigate('/', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, onFinished]);

  return (
    <Container>
      <section className="splash-container">
        <img src={Logo} alt="Vote Solve Logo" className="logo" />
        <p className="subtitle">연예 고민, 함께 결정하고 해결하는 공간</p>
        <footer className="footer">Uh? Ban Team</footer>
      </section>
    </Container>
  );
};

export default SplashScreen;