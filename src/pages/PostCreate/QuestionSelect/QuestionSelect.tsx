import { useState } from 'react'
import './QuestionSelect.css'
import BottomModal from '@/components/BottomModal/BottomModal'
import QuestionModal from '../QuestionModal/QuestionModal'

interface QuestionProps {
  question: string
  onChangeQuestion: (question: string) => void
}

const QuestionSelect = (props: QuestionProps) => {
  const { question, onChangeQuestion } = props
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <div className='question-select'>
      {question === '' ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className='question-select-button'
        >
          질문 선택
        </button>
      ) : (
        <div className='question-selected'>
          <p className='question-selected-title'>선택한 질문</p>
          <div className='question-selected-name'>{question}</div>
          <button
            className='question-reselect'
            onClick={() => setIsModalOpen(true)}
          >
            질문 다시 선택
          </button>
        </div>
      )}
      {isModalOpen && (
        <BottomModal
          onClick={() => setIsModalOpen(false)}
          buttonText='닫기'
        >
          <QuestionModal
            question={question}
            onChangeQuestion={onChangeQuestion}
          />
        </BottomModal>
      )}
    </div>
  )
}

export default QuestionSelect
