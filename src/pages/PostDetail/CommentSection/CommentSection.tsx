import CommentCard from '../CommentCard/CommentCard'
import ReplyCard from '../ReplyCard/ReplyCard'
import './CommentSection.css'

const CommentSection = () => {
  return (
    <section className='comment-section'>
      <p className='comment-total'>댓글 3</p>
      <CommentCard />
      <ReplyCard />
      <ReplyCard />
      <CommentCard />
    </section>
  )
}

export default CommentSection
