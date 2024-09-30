import React, { useState } from 'react'
import BottomModal from '@components/BottomModal/BottomModal'
import MbtiSelector from '@components/MbtiSelector/MbtiSelector'
import './JoinDetail.css'

interface JoinDetailProps {
  onSubmit: (gender: '남' | '여', birthDate: string, mbti: string) => void
  onClose: () => void
}

const JoinDetail: React.FC<JoinDetailProps> = ({ onSubmit, onClose }) => {
  const [gender, setGender] = useState<'남' | '여'>('남')
  const [birthDate, setBirthDate] = useState('')
  const [mbti, setMbti] = useState('')

  const handleMbtiChange = (selectedMbti: string) => {
    setMbti(selectedMbti)
  }

  const handleConfirmAndClose = () => {
    onSubmit(gender, birthDate, mbti)
    onClose()
  }

  return (
    <BottomModal
      onClick={handleConfirmAndClose}
      buttonText='확인'
    >
      <div className='join-detail'>
        <div className='gender-selector'>
          <h3>성별</h3>
          <div className='gender-options'>
            <label>
              <input
                type='radio'
                name='gender'
                value='남'
                checked={gender === '남'}
                onChange={() => setGender('남')}
              />
              남
            </label>
            <label>
              <input
                type='radio'
                name='gender'
                value='여'
                checked={gender === '여'}
                onChange={() => setGender('여')}
              />
              여
            </label>
          </div>
        </div>
        <div className='birth-date-selector'>
          <h3>생년월일</h3>
          <input
            type='date'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder='YYYY.MM.DD'
          />
        </div>
        <div className='mbti-selector'>
          <h3>MBTI</h3>
          <MbtiSelector onMbtiChange={handleMbtiChange} />
        </div>
      </div>
    </BottomModal>
  )
}

export default JoinDetail
