import BeforePoll from './BeforePoll'
import './PostPoll.css'
const PostPoll = () => {
  return (
    <div className='poll-container'>
      <h3 className='poll-title'>다시 연락할까요?</h3>
      <BeforePoll />
      <p className='poll-subtitle'>의견을 선택하고 댓글을 확인해보세요!</p>
    </div>
  )
}

export default PostPoll
