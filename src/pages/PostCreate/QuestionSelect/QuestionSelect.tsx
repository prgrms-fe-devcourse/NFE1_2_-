import { useState } from 'react'
import './QuestionSelect.css'
import BottomModal from '@/components/BottomModal/BottomModal'
import QuestionModal from '../QuestionModal/QuestionModal'

const QuestionSelect = () => {
  const [isSelect, setQuestion] = useState(false)
  return (
    <div className='question-select'>
      {isSelect ? (
        <div className='question-selected'>
          <p className='question-selected-title'>선택한 질문</p>
          <div className='question-selected-name'>사과할까요?</div>
          <button className='question-reselect'>질문 다시 선택</button>
        </div>
      ) : (
        <button
          onClick={() => setQuestion(true)}
          className='question-select-button'
        >
          질문 선택
        </button>
      )}
      <BottomModal onClick={()=>setQuestion(false)} buttonText='닫기'>
        <QuestionModal />
      </BottomModal>
    </div>
  )
}

export default QuestionSelect
