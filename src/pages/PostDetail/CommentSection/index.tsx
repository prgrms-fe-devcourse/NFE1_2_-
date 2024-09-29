import { Comment } from '@/typings/types'
import CommentCard from '../CommentCard/indext'
import ReplyCard from '../ReplyCard'
import './index.css'

const CommentSection = ({ comments }: { comments: Comment[] }) => {
  return (
    <section className='comment-section'>
      <p className='comment-total'>댓글 {comments.length}</p>
      <CommentCard />
      <ReplyCard />
      <ReplyCard />
      <CommentCard />
    </section>
  )
}

export default CommentSection
