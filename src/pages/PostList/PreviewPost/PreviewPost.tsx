import PostCard from '@/components/PostComponent/PostComponent'
import './PreviowPost.css'
import Interaction from '../Interaction/Interaction'
const PreviewPost = () => {
  return (
    <section className='post-section'>
      {/*준희님 목데이터 가져옴*/}
      <PostCard
        post={{
          likes: [],
          comments: [],
          _id: '123',
          title: {
            type: '이별',
            title: '헤어질까요',
            body: '진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?진짜 헤어질까요?',
            poll: { agree: 0, disagree: 0, title: '진짜 헤어질까요?' },
            checkCount: 0,
          },
          author: {
            fullName: { ageGroup: '20', gender: '남', mbti: 'INTP' },
          },
          createdAt: '123123123',
        }}
        truncate={true}
      />
      <Interaction></Interaction>
    </section>
  )
}

export default PreviewPost
