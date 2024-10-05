import { useEffect, useState } from 'react'
import BeforeSelect from '@assets/icons/write_before_select.svg?react'
import AfterSelect from '@assets/icons/write_after_select.svg?react'
import './QuestionModal.css'

interface QuestionProps {
  question: string
  onChangeQuestion: (question: string) => void
  inputActive: boolean
  onChangeInputActive: (inputActive: boolean) => void
}

const QuestionModal = (props: QuestionProps) => {
  const { question, onChangeQuestion, inputActive, onChangeInputActive } = props
  const [isQuestion, setIsQuestion] = useState<boolean>(true)
  const [inputQuestion, setInputQuestion] = useState<string>(question)

  const questionList: string[] = [
    '헤어질까요?',
    '연락할까요?',
    '고백할까요?',
    '데이트 신청할까요?',
    '다시 연락할까요?',
    '사과할까요?',
  ]

  const handleQuestion = (value: string) => {
    onChangeQuestion(value)
    onChangeInputActive(false)
    setInputQuestion('')
  }

  const checkRegex = (value: string) => {
    const regex = /.+\?$/
    return regex.test(value)
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion: string = e.target.value
    setInputQuestion(newQuestion)

    const isValid = checkRegex(newQuestion)
    setIsQuestion(isValid)

    if (isValid) {
      onChangeQuestion(newQuestion)
    }
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setInputQuestion('')
    const currentValue = (e.target as HTMLInputElement).value
    onChangeQuestion(currentValue)
    onChangeInputActive(true)
  }

  //수정 시 입력한 질문 유지되도록 설정
  useEffect(() => {
    const isValidQuestion = questionList.includes(question)
    onChangeInputActive(!isValidQuestion)
    if(!isValidQuestion){
      onChangeQuestion(question)
    }
  },[])

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
            className={`question-list-basic ${!inputActive && question === item ? 'active' : ''}`}
            onClick={() => handleQuestion(item)}
          >
            <p>{item}</p>
            {question === item ? <AfterSelect /> : <BeforeSelect />}
          </button>
        ))}
      </div>
      <div className='question-list-input-container'>
        <p className={'question-list-input-title'}>질문 직접 입력하기</p>
        <input
          type='text'
          placeholder='예) 어떻게 할까요? '
          value={inputActive ? inputQuestion : ''}
          className={`question-list-input ${inputActive ? 'active' : ''}`}
          onChange={handleQuestionChange}
          onClick={handleInputClick}
        />
        <p
          className={`question-list-error ${!inputActive || isQuestion ? '' : 'question-false'}`}
        >
          질문 형태로 입력해주세요.
        </p>
      </div>
    </div>
  )
}

export default QuestionModal
