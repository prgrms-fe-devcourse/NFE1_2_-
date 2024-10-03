import ListComment from '@assets/icons/list_comment.svg?react'
import ListVote from '@assets/icons/list_vote.svg?react'
import HeartBefore from '@assets/icons/heart_before_select.svg?react'
import './Interaction.css'

const Interaction = ({
  likes,
  comments,
  polls,
}: {
  likes: number
  comments: number
  polls: number
}) => {
  return (
    <div>
      <div className='interaction-icon'>
        <div className='icon-value'>
          <ListVote
            width={20}
            height={20}
          ></ListVote>
          {polls}
        </div>
        <div className='icon-value'>
          <ListComment
            width={20}
            height={20}
          ></ListComment>
          {comments}
        </div>
        <div className='icon-value'>
          <HeartBefore
            width={24}
            height={24}
          ></HeartBefore>
          {likes}
        </div>
      </div>
    </div>
  )
}

export default Interaction
