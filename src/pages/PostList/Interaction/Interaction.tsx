import ListComment from '@assets/icons/list_comment.svg?react'
import ListVote from '@assets/icons/list_vote.svg?react'
import HeartBefore from '@assets/icons/heart_before_select.svg?react'
import { FormattedPost } from '@/typings/types'
import './Interaction.css'

const Interaction = ({ post }: { post: FormattedPost }) => {
  const {
    likes,
    comments,
    title: { poll },
  } = post
  const votedUserLength = poll.agree.length + poll.disagree.length

  return (
    <div className='interaction-icon'>
      <div className='icon-value'>
        <ListVote
          width={19}
          height={19}
        ></ListVote>
        <span>{votedUserLength}</span>
      </div>
      <div className='icon-value'>
        <ListComment
          width={18}
          height={18}
        ></ListComment>
        <span>{comments.length}</span>
      </div>
      <div className='icon-value'>
        <HeartBefore
          width={16}
          height={16}
          fill='#7d7d7d'
        ></HeartBefore>
        <span>{likes.length}</span>
      </div>
    </div>
  )
}

export default Interaction
