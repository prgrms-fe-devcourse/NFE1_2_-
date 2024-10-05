import { useEffect, useState } from 'react'
import './QuestionSelect.css'
import BottomModal from '@/components/BottomModal/BottomModal'
import QuestionModal from '../QuestionModal/QuestionModal'

interface QuestionProps {
  isPoll: boolean
  category: string
  question: string
  onChangeQuestion: (question: string) => void
}

const QuestionSelect = (props: QuestionProps) => {
  const { isPoll, category, question, onChangeQuestion } = props
  const [inputActive, setInputActive] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const questionMap: { [key: string]: string } = {
    이별: '헤어질까요?',
    짝사랑: '연락할까요?',
    썸: '고백할까요?',
    데이트: '데이트 신청할까요?',
    기타: '',
  }

  useEffect(() => {
    if (!inputActive) {
      const question = questionMap[category] || ''
      onChangeQuestion(question)
    }
  }, [category])

  return (
    <div className='question-select'>
      {question ? (
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
      ) : (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className='question-select-button'
          >
            질문 선택
          </button>
          <p className='category-not-select'>
            카테고리를 선택하면 질문이 자동으로 추천됩니다.
          </p>
        </>
      )}

      {isModalOpen && (
        <BottomModal
          onClick={() => setIsModalOpen(false)}
          buttonText={question ? '확인' : '닫기'}
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
