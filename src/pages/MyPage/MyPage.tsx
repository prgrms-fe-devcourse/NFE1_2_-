import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import ProfileSection from './MyPageSection/ProfileSection'
import AccountSection from './MyPageSection/AccountSection'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserData, updateUserData } from '@/utils/api'
import Loading from '../Loading/Loading'
import NotFound from '../NotFound/NotFound'

const MyPage = () => {
  const [modalOpen, setModalOpen] = useState({
    profileModal: false,
    passwordModal: false,
  })
  const { profileModal, passwordModal } = modalOpen
  const handleOpenModal = (modal: string) => {
    setModalOpen({
      profileModal: false,
      passwordModal: false,
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserData(userId as string),
    enabled: !!userId,
    // refetchInterval : 1000
  })

  const mutationFn = (fullname: string) => updateUserData(fullname)
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
  })

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <NotFound />
  }

  return (
    <MainPageLayout>
      <section>
        <div className='user-info'>
          <p className='info-title'>내 정보</p>
        </div>
        <ProfileSection
          userData={data}
          mutate={mutate}
          isModalOpen={profileModal}
          onChangeOpenModal={() => handleOpenModal('profileModal')}
          onChangeCloseModal={() => handleCloseModal('profileModal')}
        />
        <AccountSection
          userData={data}
          isModalOpen={passwordModal}
          onChangeOpenModal={() => handleOpenModal('passwordModal')}
          onChangeCloseModal={() => handleCloseModal('passwordModal')}
        />
      </section>
    </MainPageLayout>
  )
}

export default MyPage
