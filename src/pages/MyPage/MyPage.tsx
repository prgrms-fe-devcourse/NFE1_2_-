import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import ProfileSection from './MyPageSection/ProfileSection'
import AccountSection from './MyPageSection/AccountSection'
import OtherSection from './MyPageSection/OtherSection'

const MyPage = () => {
  return (
    <MainPageLayout>
      <section>
        <div className='user-info'>
          <p className='info-title'>내 정보</p>
        </div>
        <ProfileSection />
        <AccountSection />
        <OtherSection />
      </section>
    </MainPageLayout>
  )
}

export default MyPage
