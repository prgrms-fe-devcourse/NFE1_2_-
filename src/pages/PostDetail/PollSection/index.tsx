import { useEffect, useState } from 'react'
import AfterPoll from './AfterPoll'
import BeforePoll from './BeforePoll'
import './index.css'
import { FormattedPost } from '@/typings/types'

const PollSection = ({ post }: { post: FormattedPost }) => {
  const [isVoted, setIsVoted] = useState<boolean | null>(null)
  useEffect(() => {
    // 유저가 작성자 또는 투표를 완료했는지 검증
    const {
      author,
      title: { poll },
    } = post
    const { agree, disagree } = poll
    const voterList = [...agree, ...disagree]

    const checkIsVoter = voterList.some(
      (voter) => voter === import.meta.env.VITE_USER_ID,
    )
    const checkIsAhuthor = import.meta.env.VITE_USER_ID === author._id
    const checkValidUser = checkIsAhuthor || checkIsVoter

    setIsVoted(checkValidUser)
  }, [post])

  const {
    _id,
    title: { poll },
  } = post

  const { title } = poll
  return (
    <div className='poll-container'>
      <h3 className='poll-title'>{title}</h3>
      {isVoted ? (
        <AfterPoll poll={poll} />
      ) : (
        <BeforePoll
          postId={_id}
          setIsVoted={setIsVoted}
        />
      )}
      <p className='poll-subtitle'>
        {isVoted
          ? '이제 댓글을 남겨보세요!'
          : '의견을 선택하고 댓글을 확인해보세요!'}
      </p>
    </div>
  )
}

export default PollSection
