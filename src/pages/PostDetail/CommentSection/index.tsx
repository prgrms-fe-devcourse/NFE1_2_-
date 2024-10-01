import { Comment } from '@/typings/types'
import CommentCard from '../CommentCard/indext'
import './index.css'

const CommentSection = ({ comments }: { comments: Comment[] }) => {
  return (
    <section className='comment-section'>
      <p className='comment-total'>댓글 {comments.length}</p>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
        />
      ))}
    </section>
  )
}

export default CommentSection
