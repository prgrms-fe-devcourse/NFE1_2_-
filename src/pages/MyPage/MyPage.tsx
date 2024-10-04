import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import ProfileSection from './MyPageSection/ProfileSection'
import AccountSection from './MyPageSection/AccountSection'
import OtherSection from './MyPageSection/OtherSection'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '@/utils/api'
import useCustomMutation from '@/hooks/useCustomMutaition'

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
    })
  }
  const handleCloseModal = (modal: string) => {
    setModalOpen((prevState) => ({
      ...prevState,
      [modal]: false,
    }))
  }
  const userId = localStorage.getItem('userId')
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserData(userId as string),
    enabled: !!userId
    // refetchInterval : 1000
  })

  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    return <div>{error.message}</div>
  }

  const mutationFn = () => getUserData(userId as string)

  // const { data, mutate } = useCustomMutation({
  //   mutationFn,
  //   queryKey: ['profile'],
  // })

  return (
    <MainPageLayout>
      <section>
        <div className='user-info'>
          <p className='info-title'>내 정보</p>
        </div>
        <ProfileSection
          userData={data}
          isModalOpen={profileModal}
          mutate={mutate}
          onChangeOpenModal={() => handleOpenModal('profileModal')}
          onChangeCloseModal={() => handleCloseModal('profileModal')}
        />
        <AccountSection
          userData={data}
          isModalOpen={passwordModal}
          onChangeOpenModal={() => handleOpenModal('passwordModal')}
          onChangeCloseModal={() => handleCloseModal('passwordModal')}
        />
        <OtherSection
          userData={data}
          isModalOpen={withdrawModal}
          onChangeOpenModal={() => handleOpenModal('withdrawModal')}
          onChangeCloseModal={() => handleCloseModal('withdrawModal')}
        />
      </section>
    </MainPageLayout>
  )
}

export default MyPage
