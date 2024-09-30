import AgreeOptionImg from '@assets/imgs/agree.png'
import DisAgreeOptionImg from '@assets/imgs/disagree.png'
import { useMutation } from '@tanstack/react-query'
import { USER_ID } from '@utils/api'
import { useCallback } from 'react'

interface BeforePollProps {
  postId: string
  setIsVoted: React.Dispatch<React.SetStateAction<boolean | null>>
}

const BeforePoll = ({ postId, setIsVoted }: BeforePollProps) => {
  console.log(postId, setIsVoted)
  const { mutate } = useMutation({
    onMutate: () => {},
    onSuccess: () => {},
  })
  const handleSubmitPoll = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log(event.currentTarget.getAttribute('aria-label'))
    },
    [],
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
