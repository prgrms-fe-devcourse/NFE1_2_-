import PostComponent from '@components/PostComponent/PostComponent'
import LikeButton from '../LikeButton/LikeButton'

const PostSection = () => {
  return (
    <section className='post-section'>
      {/* 목데이터 집어 넣어서 타입 에러 뜹니다. 추후 수정 예정 */}
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
