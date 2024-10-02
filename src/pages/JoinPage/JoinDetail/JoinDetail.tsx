import React, { useState } from 'react'
import BottomModal from '@components/BottomModal/BottomModal'
import MbtiSelector from '@components/MbtiSelector/MbtiSelector'
// SVG 아이콘 import
import Write_before_select from '@assets/icons/write_before_select.svg?react'
import Write_after_select from '@assets/icons/write_after_select.svg?react'
import './JoinDetail.css'

// 컴포넌트 props 타입 정의
interface JoinDetailProps {
  onSubmit: (gender: '남' | '여', birthDate: string, mbti: string) => void
  onClose: () => void
}

const JoinDetail: React.FC<JoinDetailProps> = ({ onSubmit, onClose }) => {
  // 상태 관리: 성별, 생년월일, MBTI
  const [gender, setGender] = useState<'남' | '여'>('남')
  const [birthDate, setBirthDate] = useState('')
  const [mbti, setMbti] = useState('')

  // MBTI 선택 핸들러
  const handleMbtiChange = (selectedMbti: string) => {
    setMbti(selectedMbti)
  }

  // 확인 버튼 클릭 시 실행되는 함수
  // 선택된 정보를 부모 컴포넌트로 전달하고 모달을 닫음
  const handleConfirmAndClose = () => {
    onSubmit(gender, birthDate, mbti)
    onClose()
  }

  // 성별 선택 핸들러
  const handleGenderSelect = (selectedGender: '남' | '여') => {
    setGender(selectedGender)
  }

  return (
    <BottomModal
      onClick={handleConfirmAndClose}
      buttonText='확인'
    >
      <div className='join-detail'>
        {/* 성별 선택 섹션 */}
        <div className='gender-selector'>
          <h3>성별</h3>
          <div className='gender-options'>
            {/* 남성 선택 옵션 */}
            <div className='gender-option' onClick={() => handleGenderSelect('남')}>
              {/* 선택 상태에 따라 다른 SVG 아이콘 표시 */}
              <span>남</span>
              {gender === '남' ? <Write_after_select /> : <Write_before_select />}
            </div>
            {/* 여성 선택 옵션 */}
            <div className='gender-option' onClick={() => handleGenderSelect('여')}>
              <span>여</span>
              {gender === '여' ? <Write_after_select /> : <Write_before_select />}             
            </div>
          </div>
        </div>
        
        {/* 생년월일 입력 섹션 */}
        <div className='birth-date-selector'>
          <h3>생년월일</h3>
          <input
            type='date'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder='YYYY.MM.DD'
          />
        </div>
        
        {/* MBTI 선택 섹션 */}
        <div className='mbti-selector'>
          <h3>MBTI</h3>
          {/* MbtiSelector 컴포넌트를 사용하여 MBTI 선택 UI 구현 */}
          <MbtiSelector onMbtiChange={handleMbtiChange} />
        </div>
      </div>
    </BottomModal>
  )
}

export default JoinDetail