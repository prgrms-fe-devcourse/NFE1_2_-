import { useState } from 'react';
import BottomModal from '@components/BottomModal/BottomModal';
import MbtiSelector from '@components/MbtiSelector/MbtiSelector';
import './JoinDetail.css';

const JoinDetail: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthDate, setBirthDate] = useState('');
  const [mbti, setMbti] = useState('');

  const handleMbtiChange = (selectedMbti: string) => {
    setMbti(selectedMbti);
  };

  const handleSubmit = () => {
    console.log({ gender, birthDate, mbti });
  };

  return (
    <BottomModal onClick={handleSubmit} buttonText="확인">
      <div className="join-detail">
        <div className="gender-selector">
          <h3>성별</h3>
          <div className="gender-options">
            <label>
                남
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              
            </label>
            <label>
                여
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
            
            </label>
          </div>
        </div>
        <div className="birth-date-selector">
          <h3>생년월일</h3>
          <input 
            type="date" 
            value={birthDate} 
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="YYYY.MM.DD"
          />
        </div>
        <div className="mbti-selector">
          <h3>MBTI</h3>
          <MbtiSelector onMbtiChange={handleMbtiChange} />
        </div>
      </div>
    </BottomModal>
  );
};

export default JoinDetail;