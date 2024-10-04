import { useState } from 'react'
import './QuestionSelect.css'
import BottomModal from '@/components/BottomModal/BottomModal'
import QuestionModal from '../QuestionModal/QuestionModal'

interface QuestionProps {
  isPoll: boolean
  question: string
  onChangeQuestion: (question: string) => void
}

const QuestionSelect = (props: QuestionProps) => {
  const { isPoll, question, onChangeQuestion } = props
  const [inputActive, setInputActive] = useState<boolean>(false)
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
          {!isPoll ? (
            <button
              className='question-reselect'
              onClick={() => setIsModalOpen(true)}
            >
              질문 다시 선택
            </button>
          ) : (
            <p className='question-reselect-error'>
              투표가 이미 진행되어 질문을 수정할 수 없습니다.
            </p>
          )}
        </div>
      )}
      {isModalOpen && (
        <BottomModal
          onClick={() => setIsModalOpen(false)}
          buttonText={question === '' ? '닫기' : '확인'}
        >
          <QuestionModal
            question={question}
            onChangeQuestion={onChangeQuestion}
            inputActive={inputActive}
            onChangeInputActive={setInputActive}
          />
        </BottomModal>
      )}
    </div>
  )
}

export default QuestionSelect
