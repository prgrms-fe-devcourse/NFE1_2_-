import ListComment from '@assets/icons/list_comment.svg?react'
import ListVote from '@assets/icons/list_vote.svg?react'
import HeartBefore from '@assets/icons/heart_before_select.svg?react'
import './Interaction.css'
import { FormattedPost } from '@/typings/types'

const Interaction = ({ post }: { post: FormattedPost }) => {
  const {
    likes,
    comments,
    title: { poll },
  } = post
  const votedUserLength = poll.agree.length + poll.disagree.length

  return (
    <div>
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
            width={20}
            height={20}
            fill='#7D7D7D'
          ></HeartBefore>
          <span>{likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Interaction
