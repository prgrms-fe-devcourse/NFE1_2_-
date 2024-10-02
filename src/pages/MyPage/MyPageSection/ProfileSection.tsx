import { User } from '@/typings/types'
import InfoSection from '../Component/InfoSection/InfoSection'
import '../MyPage.css'
import { parseIfString } from '@/utils/formatPostData'

interface SectionProps {
  userData : User
  isModalOpen: boolean
  onChangeOpenModal: () => void
  onChangeCloseModal: () => void
}

const ProfileSection = (props: SectionProps) => {
  const { userData, isModalOpen, onChangeOpenModal, onChangeCloseModal } = props
  const {gender , ageGroup, mbti} = parseIfString(userData.fullName)

  return (
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
      <div className='info-edit'>프로필 수정</div>
      
    </InfoSection>
  )
}

export default ProfileSection
