import AgreeOptionImg from '@assets/imgs/agree.png'
import DisAgreeOptionImg from '@assets/imgs/disagree.png'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PollData, postPoll, USER_ID } from '@utils/api'
import { useCallback } from 'react'

interface BeforePollProps {
  postId: string
  setIsVoted: React.Dispatch<React.SetStateAction<boolean | null>>
}

const BeforePoll = ({ postId, setIsVoted }: BeforePollProps) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (pollData: PollData) => postPoll(postId, pollData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      setIsVoted(true)
    },
    onError: (error) => {
      console.error('투표 실패', error)
    },
  })

  const handleSubmitPoll = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const voteSection = event.currentTarget.getAttribute('aria-label')
      const pollData: PollData =
        voteSection === 'agree'
          ? { user: USER_ID, voted: 'agree' }
          : { user: USER_ID, voted: 'disagree' }

      // useMutation으로 투표 요청 실행
      mutation.mutate(pollData)
    },
    [mutation],
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
