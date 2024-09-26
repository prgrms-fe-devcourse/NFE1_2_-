import PostComponent from '@components/PostComponent/PostComponent'
import LikeButton from '../LikeButton/LikeButton'
import './PostSection.css'

const PostSection = () => {
  return (
    <section className='post-section'>
      <PostComponent
        post={{
          likes: [],
          comments: [],
          _id: '123',
          title: {
            type: '이별',
            title: '헤어질까요',
            body: '진짜 헤어질까요?',
            poll: { agree: 0, disagree: 0, title: '진짜 헤어질까요?' },
            checkCount: 0,
          },
          author: {
            fullName: { ageGroup: '20', gender: '남', mbti: 'INTP' },
          },
          createdAt: '123123123',
        }}
      />
      <LikeButton />
    </section>
  )
}

export default PostSection
