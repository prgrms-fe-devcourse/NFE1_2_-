import Section from '../Component/Section'
import '../MyPage.css'

const ProfileSection = () => {
  return (
    <Section title='프로필'>
      <p className='item'>
        MBTI<span className='value'>istp</span>
      </p>
      <p className='item'>
        성별<span className='value'>여</span>
      </p>
      <p className='item'>
        나이<span className='value'>20대</span>
      </p>
      <div className='edit'>프로필 수정</div>
    </Section>
  )
}

export default ProfileSection
