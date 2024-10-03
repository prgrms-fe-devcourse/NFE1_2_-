import useCustomMutation from '@/hooks/useCustomMutaition'
import AgreeOptionImg from '@assets/imgs/agree.png'
import DisAgreeOptionImg from '@assets/imgs/disagree.png'
import { PollData, postPoll, USER_ID } from '@utils/api'
import { useCallback } from 'react'

interface BeforePollProps {
  postId: string
  setIsVoted: React.Dispatch<React.SetStateAction<boolean | null>>
}

const BeforePoll = ({ postId, setIsVoted }: BeforePollProps) => {
  const mutationFn = (pollData: PollData) => postPoll(postId, pollData)
  const onSuccessCallback = () => setIsVoted(true)

  const { mutate } = useCustomMutation({
    queryKey: ['post', postId],
    mutationFn,
    onSuccessCallback,
  })

  const handleSubmitPoll = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const voteSection = event.currentTarget.getAttribute('aria-label')
      const pollData: PollData =
        voteSection === 'agree'
          ? { user: USER_ID, voted: 'agree' }
          : { user: USER_ID, voted: 'disagree' }

      // useMutation으로 투표 요청 실행
      mutate(pollData)
    },
    [mutate],
  )

  return (
    <div className='poll-option-container'>
      <div className='poll-option'>
        <p>찬성</p>
        <button
          className='poll-button'
          aria-label='agree'
          onClick={(event) => handleSubmitPoll(event)}
        >
          <img
            src={AgreeOptionImg}
            alt='찬성 이미지'
          />
        </button>
      </div>
      <div className='poll-option'>
        <p>반대</p>
        <button
          className='poll-button'
          aria-label='disagree'
          onClick={(event) => handleSubmitPoll(event)}
        >
          <img
            src={DisAgreeOptionImg}
            alt='반대 이미지'
          />
        </button>
      </div>
    </div>
  )
}

export default BeforePoll
