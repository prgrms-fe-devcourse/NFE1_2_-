import React, { useEffect, useState } from 'react'
import BottomModal from '@components/BottomModal/BottomModal'
import MbtiSelector from '@components/MbtiSelector/MbtiSelector'
// SVG 아이콘 import
import Write_before_select from '@assets/icons/write_before_select.svg?react'
import Write_after_select from '@assets/icons/write_after_select.svg?react'
import './JoinDetail.css'

// 컴포넌트 props 타입 정의
interface JoinDetailProps {
  initialData?: { gender: '남' | '여'; birthDate?: string; mbti: string }
  isEdit?: boolean
  onSubmit: (gender: '남' | '여', birthDate: string, mbti: string) => void
  onClose: () => void
}

const JoinDetail: React.FC<JoinDetailProps> = ({
  initialData,
  isEdit,
  onSubmit,
  onClose,
}) => {
  // 상태 관리: 성별, 생년월일, MBTI
  const [gender, setGender] = useState<'남' | '여'>('남')
  const [birthDate, setBirthDate] = useState('')
  const [isBirthDate, setIsBirthDate] = useState<boolean>(false)
  const [mbti, setMbti] = useState('')
  useEffect(() => {
    if (initialData) {
      setGender(initialData.gender)
      setMbti(initialData.mbti)
      if (initialData.birthDate) {
        setBirthDate(initialData.birthDate)
        setIsBirthDate(true)
      }
    }
  }, [initialData])

  const formatDate = (value: string) => {
    // 숫자만 남기기
    const dateText = value.replace(/\D/g, '')

    // 최대 8자리로 제한
    if (dateText.length <= 8) {
      let formattedValue = dateText

      // 4번째 자리와 6번째 자리 뒤에 하이픈 추가
      if (dateText.length > 4) {
        formattedValue = dateText.slice(0, 4) + '-' + dateText.slice(4)
      }
      if (dateText.length > 6) {
        formattedValue =
          formattedValue.slice(0, 7) + '-' + formattedValue.slice(7)
      }

      setBirthDate(formattedValue)

      if (formattedValue.length === 10 && validateDate(formattedValue)) {
        setIsBirthDate(true)
      } else {
        setIsBirthDate(false)
      }
    }
  }

  //날짜 겅규식 검토
  const validateDate = (date: string) => {
    const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
    return dateRegex.test(date)
  }

  //날짜 선택 핸들러
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formatDate(e.target.value)
  }

  // MBTI 선택 핸들러
  const handleMbtiChange = (selectedMbti: string) => {
    setMbti(selectedMbti)
  }

  // 확인 버튼 클릭 시 실행되는 함수
  // 선택된 정보를 부모 컴포넌트로 전달하고 모달을 닫음
  const handleConfirmAndClose = () => {
    if (isBirthDate && mbti) {
      onSubmit(gender, birthDate, mbti)
    }
    onClose()
  }

  // 성별 선택 핸들러
  const handleGenderSelect = (selectedGender: '남' | '여') => {
    setGender(selectedGender)
  }

  return (
    <BottomModal
      onClick={handleConfirmAndClose}
      buttonText={isBirthDate && mbti ? '확인' : '닫기'}
    >
      <div className='join-detail'>
        {/* 성별 선택 섹션 */}
        <div className='gender-selector'>
          <h3>성별</h3>
          <div className='gender-options'>
            {/* 남성 선택 옵션 */}
            <div
              className='gender-option'
              onClick={() => handleGenderSelect('남')}
            >
              {/* 선택 상태에 따라 다른 SVG 아이콘 표시 */}
              <span>남</span>
              {gender === '남' ? (
                <Write_after_select />
              ) : (
                <Write_before_select />
              )}
            </div>
            {/* 여성 선택 옵션 */}
            <div
              className='gender-option'
              onClick={() => handleGenderSelect('여')}
            >
              <span>여</span>
              {gender === '여' ? (
                <Write_after_select />
              ) : (
                <Write_before_select />
              )}
            </div>
          </div>
        </div>
        {/* 생년월일 입력 섹션 */}
        {!isEdit && (
          <div className='birth-date-selector'>
            <h3>생년월일</h3>
            <input
              type='text'
              className='birth-date-input'
              value={birthDate}
              onChange={handleAgeChange}
              placeholder='YYYY-MM-DD'
            />
            {!isBirthDate && (
              <p className='select-error-text'>생년월일을 입력하세요.</p>
            )}
          </div>
        )}

        {/* MBTI 선택 섹션 */}
        <div className='mbti-selector'>
          <h3>MBTI</h3>
          {/* MbtiSelector 컴포넌트를 사용하여 MBTI 선택 UI 구현 */}
          {initialData ? (
            <MbtiSelector
              initialMbti={initialData.mbti}
              onMbtiChange={handleMbtiChange}
            />
          ) : (
            <MbtiSelector onMbtiChange={handleMbtiChange} />
          )}
        </div>
      </div>
    </BottomModal>
  )
}

export default JoinDetail
