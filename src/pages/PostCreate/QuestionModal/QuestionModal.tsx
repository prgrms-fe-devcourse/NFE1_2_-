import './QuestionModal.css'

const QuestionModal = () => {
  const questionList: string[] = [
    '헤어질까요?',
    '사과할까요?',
    '고백할까요?',
    '다시 연락할까요?',
  ]
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
          <div
            key={index}
            className='question-list-basic'
          >
            <p>{item}</p>
            <input
              type='radio'
              name='question'
              value={item}
            />
          </div>
        ))}
      </div>
      <div className='question-list-input-container'>
        <p className='question-list-input-title'>질문 형태로 입력해주세요.</p>
        <input
          type='text'
          placeholder='질문 직접 입력'
          className='question-list-input'
        />
      </div>
    </div>
  )
}

export default QuestionModal
