import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import ProfileSection from './MyPageSection/ProfileSection'
import AccountSection from './MyPageSection/AccountSection'
import OtherSection from './MyPageSection/OtherSection'
import { useState } from 'react'

const MyPage = () => {
  const [modalOpen, setModalOpen] = useState({
    profileModal: false,
    passwordModal: false,
    withdrawModal: false,
  })
  const { profileModal, passwordModal, withdrawModal } = modalOpen
  const handleOpenModal = (modal: string) => {
    setModalOpen({
      profileModal: false,
      passwordModal: false,
      withdrawModal: false,
      [modal]: true,
    })}
    const handleCloseModal = (modal: string) => {
      setModalOpen((prevState) => ({
        ...prevState,
        [modal]: false,
      }))
    }
    return (
      <MainPageLayout>
        <section>
          <div className='user-info'>
            <p className='info-title'>내 정보</p>
          </div>
          <ProfileSection
            isModalOpen={profileModal}
            onChangeOpenModal={() => handleOpenModal('profileModal')}
            onChangeCloseModal={() => handleCloseModal('profileModal')}
          />
          <AccountSection
            isModalOpen={passwordModal}
            onChangeOpenModal={() => handleOpenModal('passwordModal')}
            onChangeCloseModal={() => handleCloseModal('passwordModal')}
          />
          <OtherSection
            isModalOpen={withdrawModal}
            onChangeOpenModal={() => handleOpenModal('withdrawModal')}
            onChangeCloseModal={() => handleCloseModal('withdrawModal')}
          />
        </section>
      </MainPageLayout>
    )
  }

export default MyPage
