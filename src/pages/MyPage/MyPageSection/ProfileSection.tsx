import InfoSection from '../Component/InfoSection'
import '../MyPage.css'

const ProfileSection = () => {
  return (
    <InfoSection title='프로필'>
      <p className='info-item'>
        MBTI<span className='value'>istp</span>
      </p>
      <p className='info-item'>
        성별<span className='value'>여</span>
      </p>
      <p className='info-item'>
        나이<span className='value'>20대</span>
      </p>
      <div className='info-edit'>프로필 수정</div>
    </InfoSection>
  )
}

export default ProfileSection
