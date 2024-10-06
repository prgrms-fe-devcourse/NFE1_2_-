import { User, UserDetailData } from '@/typings/types'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'
import { parseIfString } from '@/utils/formatPostData'
import JoinDetail from '@/pages/JoinPage/JoinDetail/JoinDetail'

interface SectionProps {
  mutate: (fullname: string) => void
  userData: User | undefined
  isModalOpen: boolean
  onChangeOpenModal: () => void
  onChangeCloseModal: () => void
}

const ProfileSection = (props: SectionProps) => {
  const {
    mutate,
    userData,
    isModalOpen,
    onChangeOpenModal,
    onChangeCloseModal,
  } = props
  const fullName = parseIfString(userData?.fullName as UserDetailData)
  const { gender, ageGroup, mbti } = fullName

  const calculateAgeGroup = (birthDate: string) => {
    const today = new Date()
    const birthYear = new Date(birthDate).getFullYear()
    const age = today.getFullYear() - birthYear
    const ageGroup = Math.floor(age / 10) * 10
    return ageGroup >= 90 ? '90' : `${ageGroup}`
  }

  const handleEditProfile = (
    gender: '남' | '여',
    birthDate: string,
    mbti: string,
  ) => {
    const fullNameObject = {
      gender: gender,
      ageGroup: calculateAgeGroup(birthDate),
      mbti: mbti,
    }
    const fullname = JSON.stringify(fullNameObject)
    mutate(fullname)
  }

  return (
    <>
      <InfoSection title='프로필'>
        <p className='info-item'>
          성별<span className='value'>{gender}</span>
        </p>
        <p className='info-item'>
          나이<span className='value'>{ageGroup}대</span>
        </p>
        <p className='info-item'>
          MBTI<span className='value'>{mbti}</span>
        </p>
        <button
          className='info-edit'
          onClick={onChangeOpenModal}
        >
          프로필 수정
        </button>
      </InfoSection>
      {isModalOpen && (
        <JoinDetail
          initialData={fullName}
          isEdit={true}
          onSubmit={handleEditProfile}
          onClose={onChangeCloseModal}
        />
      )}
    </>
  )
}

export default ProfileSection
