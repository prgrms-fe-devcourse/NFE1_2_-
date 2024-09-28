import CommentCard from '../CommentCard/indext'
import ReplyCard from '../ReplyCard'
import './index.css'

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
