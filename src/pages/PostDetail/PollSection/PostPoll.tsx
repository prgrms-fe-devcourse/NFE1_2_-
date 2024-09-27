import { useCallback, useState } from 'react'
import AfterPoll from './AfterPoll'
import BeforePoll from './BeforePoll'
import './PostPoll.css'

const PostPoll = () => {
  const [isPoll, setIsPoll] = useState(false)
  const handleOnclick = useCallback(() => {
    setIsPoll(true)
  }, [])

  return (
    <div className='poll-container'>
      <h3 className='poll-title'>다시 연락할까요?</h3>
      {isPoll ? <AfterPoll /> : <BeforePoll onClick={handleOnclick} />}
      <p className='poll-subtitle'>
        {isPoll
          ? '이제 댓글을 남겨보세요!'
          : '의견을 선택하고 댓글을 확인해보세요!'}
      </p>
    </div>
  )
}

export default PostPoll
