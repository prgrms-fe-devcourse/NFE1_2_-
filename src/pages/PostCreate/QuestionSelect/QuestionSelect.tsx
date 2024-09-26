import { useState } from 'react'
import './QuestionSelect.css'

const QuestionSelect = () => {
  const [isSelect, setQuestion] = useState(false)
  return (
    <div className='question-select'>
      {isSelect ? (
        <button onClick={() => setQuestion(true)} className='question-select-button'>질문 선택</button>
      ) : (
        <div className='question-selected'>
          <p className='question-selected-title'>선택한 질문</p>
          <div className='question-selected-name'>사과할까요?</div>
          <button className='question-reselect'>질문 다시 선택</button>
        </div>
      )}
    </div>
  )
}

export default QuestionSelect
