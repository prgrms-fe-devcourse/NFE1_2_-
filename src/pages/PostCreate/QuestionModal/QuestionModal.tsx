import { useState } from 'react'
import './QuestionModal.css'
import BeforeSelect from '@assets/icons/write_before_select.svg?react'
import AfterSelect from '@assets/icons/write_after_select.svg?react'

const QuestionModal = () => {
  const [question, setQuestion] = useState('')
  const [isQuestion, setIsQuestion] = useState(true)
  const [isInputActive, setIsInputActive] = useState(false)

  console.log(question)
  const questionList: string[] = [
    '헤어질까요?',
    '사과할까요?',
    '고백할까요?',
    '다시 연락할까요?',
  ]

  const handleQuestion = (value: string) => {
    setQuestion(value)
    setIsInputActive(false)
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion: string = e.target.value
    setIsQuestion(newQuestion.includes('?'))
    setQuestion(newQuestion)
  }
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const currentValue = (e.target as HTMLInputElement).value
    setQuestion(currentValue)
    setIsInputActive(true)
  }

  return (
    <div className='question-modal'>
      <div className='question-title-container'>
        <p className='question-title'>원하는 질문을 선택해주세요!</p>
        <p className='question-subtitle'>
          사람들의 의견을 듣고 싶은 질문을 택하거나,
          <br />
          직접 질문을 입력해보세요.
        </p>
      </div>
      <div className='question-list-basic-container'>
        {questionList.map((item, index) => (
          <button
            key={index}
            className={`question-list-basic ${question === item ? 'active' : ''}`}
            onClick={() => handleQuestion(item)}
          >
            <p>{item}</p>
            {question === item ? <AfterSelect /> : <BeforeSelect />}
          </button>
        ))}
      </div>
      <div className='question-list-input-container'>
        <p
          className={`question-list-input-title ${isQuestion ? '' : 'question-false'}`}
        >
          질문 형태로 입력해주세요.
        </p>
        <input
          type='text'
          placeholder='질문 직접 입력'
          className={`question-list-input ${isInputActive ? 'active' : ''}`}
          onChange={handleQuestionChange}
          onClick={handleInputClick}
        />
      </div>
    </div>
  )
}

export default QuestionModal
