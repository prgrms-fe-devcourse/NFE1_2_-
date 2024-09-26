import Container from '@components/Conatiner/Container'
import PostPoll from '@pages/PostDetail/PollSection/PostPoll'
import CommentSection from '@pages/PostDetail/CommentSection/CommentSection'
import LikeButton from '../LikeButton/LikeButton'
import MessageBtn from '../MessageBtn/MessageBtn'
const PostDetail = () => {
  return (
    <Container>
      <MessageBtn />
      <LikeButton />
      <PostPoll />
      <CommentSection />
    </Container>
  )
}

export default PostDetail
