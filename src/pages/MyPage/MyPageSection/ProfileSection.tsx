import { User, UserDetailData } from '@/typings/types'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'
import { parseIfString } from '@/utils/formatPostData'
import JoinDetail from '@/pages/JoinPage/JoinDetail/JoinDetail'
import { updateUserData } from '@/utils/api'

interface SectionProps {
  mutate
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
  console.log(fullName)
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
    updateUserData(fullname)
    mutate()
    console.log('변경완료', gender, birthDate, mbti)
  }

  return (
    <>
      <InfoSection title='프로필'>
        <p className='info-item'>
          MBTI<span className='value'>{mbti}</span>
        </p>
        <p className='info-item'>
          성별<span className='value'>{gender}</span>
        </p>
        <p className='info-item'>
          나이<span className='value'>{ageGroup}대</span>
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
          editData={fullName}
          onSubmit={handleEditProfile}
          onClose={onChangeCloseModal}
        />
      )}
    </>
  )
}

export default ProfileSection
