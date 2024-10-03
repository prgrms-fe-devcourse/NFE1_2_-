
import './NotFound.css';
import Aristo from '@assets/imgs/아리스토텔레스.png';
import Heart from '@assets/imgs/하트.png';
import NotLogo from '@assets/imgs/404 Not Found.png';
import Container from '@/components/Conatiner/Container';

const NotFound: React.FC = () => {
  return (
    <Container>
    <div className="not-found-container">
      <div className="quote-container">
        <blockquote className="quote">
          "누구가를 사랑한다는 것은<br></br> 자신을 그와 동일시 하는 것이다"
        </blockquote>
        <p className="quote-author">- 아리스토텔레스</p>
        <img src={NotLogo} alt="404 Not Found" className="not-found-logo" />
      </div>
  
        <img src={Aristo} alt="Aristotle" className="aristotle-image" />
        <img src={Heart} alt="Heart" className="heart-overlay1" />
        <img src={Heart} alt="Heart" className="heart-overlay2" />

    </div>
    </Container>
  );
};

export default NotFound;