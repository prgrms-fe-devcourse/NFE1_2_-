import Container from '@components/Conatiner/Container'
import PostPoll from '@pages/PostDetail/PollSection/PostPoll'
import CommentSection from '@pages/PostDetail/CommentSection/CommentSection'
const PostDetail = () => {
  return (
    <Container>
      <PostPoll />
      <CommentSection />
    </Container>
  )
}

export default PostDetail
