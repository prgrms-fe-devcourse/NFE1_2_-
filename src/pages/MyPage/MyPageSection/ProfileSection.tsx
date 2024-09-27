import '../MyPage.css'
const ProfileSection = () => {
  return (
    <div className='card'>
      <p className='title'>프로필</p>
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
    </div>
  )
}

export default ProfileSection
