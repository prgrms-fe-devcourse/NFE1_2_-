import './Loading.css';
import LoadingGif from '@assets/imgs/loading.gif';
import Container from '@/components/Conatiner/Container';
const Loading: React.FC = () => {
  return (
    <Container>
    <div className="loading-container">
      <div className="loading-text">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <img src={LoadingGif} alt="Loading" className="loading-gif" />
    </div>
    </Container>
  );
};

export default Loading;