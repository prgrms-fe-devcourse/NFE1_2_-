import MbtiSelector from '@/components/MbtiSelector/MbtiSelector'
import ModalComponent from '@/pages/MyPage/Component/ModalComponent'
import { useState } from 'react'

const Search = ({ onClose }) => {
  const [search, setSearch] = useState('')

  const handleCloseModal = () => {
    onClose()
    setSearch('')
  }

  const inputFields = [
    {
      label: '',
      value: '',
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value),
      type: 'text',
    },
  ]

  return (
    <ModalComponent
      isOpen={true}
      onClose={handleCloseModal}
      buttonText={'닫기'}
      instruction='검색'
      detail='검색할 포스트 제목을 입력하거나, MBTI 필터링 기능을 이용해보세요.'
      inputFields={inputFields}
    />
  )
}

export default Search
