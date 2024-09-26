import CommentCard from '../CommentCard/CommentCard'
import './CommentSection.css'

const CommentSection = () => {
  return (
    <section className='comment-section'>
      <p className='comment-total'>댓글 3</p>
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </section>
  )
}

export default CommentSection
