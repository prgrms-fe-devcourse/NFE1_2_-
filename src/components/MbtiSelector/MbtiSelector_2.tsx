import { useState, useEffect } from 'react'
import './MbtiSelector.css'

type MbtiType = 'EI' | 'SN' | 'TF' | 'JP'

interface MbtiState {
  [key: string]: boolean
}

interface MbtiRowProps {
  label: string
  leftOption: string
  rightOption: string
  isRight: boolean
  onChange: () => void
}

interface MbtiSelectorProps {
  onSelect?: (result: string) => void // 추가된 부분
}

const MbtiSelector_2: React.FC<MbtiSelectorProps> = ({
  onSelect = () => {},
}) => {
  const [mbti, setMbti] = useState<MbtiState>({
    EI: false,
    SN: false,
    TF: false,
    JP: false,
  })

  const updateMbti = (key: MbtiType) => {
    setMbti((prev) => {
      const newMbti = { ...prev, [key]: !prev[key] }
      onSelect(getMbtiResult(newMbti)) // MBTI 결과를 부모에게 전달
      return newMbti
    })
  }

  const getMbtiResult = (currentMbti: MbtiState): string => {
    return (
      (currentMbti.EI ? 'I' : 'E') +
      (currentMbti.SN ? 'N' : 'S') +
      (currentMbti.TF ? 'F' : 'T') +
      (currentMbti.JP ? 'P' : 'J')
    )
  }

  // 초기 상태에서 MBTI 결과를 부모에게 전달
  useEffect(() => {
    onSelect(getMbtiResult(mbti))
  }, [mbti, onSelect])

  return (
    <div className='mbti-container'>
      <div className='mbti-flex-container'>
        <MbtiRow
          label='에너지의 방향'
          leftOption='E (외향형)'
          rightOption='I (내향형)'
          isRight={mbti.EI}
          onChange={() => updateMbti('EI')}
        />
        <MbtiRow
          label='인식 방식'
          leftOption='S (감각형)'
          rightOption='N (직관형)'
          isRight={mbti.SN}
          onChange={() => updateMbti('SN')}
        />
        <MbtiRow
          label='결정 방식'
          leftOption='T (사고형)'
          rightOption='F (감정형)'
          isRight={mbti.TF}
          onChange={() => updateMbti('TF')}
        />
        <MbtiRow
          label='삶의 패턴'
          leftOption='J (판단형)'
          rightOption='P (인식형)'
          isRight={mbti.JP}
          onChange={() => updateMbti('JP')}
        />
      </div>

      <div className='mbti-result'>
        <p>
          선택된 MBTI{' '}
          <span className='mbti-result-text'>{getMbtiResult(mbti)}</span>
        </p>
      </div>
    </div>
  )
}

const MbtiRow: React.FC<MbtiRowProps> = ({
  label,
  leftOption,
  rightOption,
  isRight,
  onChange,
}) => (
  <div className='mbti-row'>
    <span className='mbti-label'>{label}</span>
    <div
      className={`mbti-slider ${isRight ? 'right' : 'left'}`}
      onClick={onChange}
    >
      <div className='mbti-slider-option left'>{leftOption}</div>
      <div className='mbti-slider-button'></div>
      <div className='mbti-slider-option right'>{rightOption}</div>
    </div>
  </div>
)

export default MbtiSelector_2
