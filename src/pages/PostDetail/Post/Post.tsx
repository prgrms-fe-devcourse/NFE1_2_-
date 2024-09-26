import Container from '@components/Conatiner/Container'
import PostPoll from '@pages/PostDetail/PollSection/PostPoll'
import CommentSection from '@pages/PostDetail/CommentSection/CommentSection'

import MessageBtn from '../MessageBtn/MessageBtn'
import PostSection from '../PostSection/PostSection'

const PostDetail = () => {
  return (
    <Container>
      <PostSection />
      <PostPoll />
      <CommentSection />
      <MessageBtn />
    </Container>
  )
}

export default PostDetail
