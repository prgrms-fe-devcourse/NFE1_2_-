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
      inputFields={inputFields}
    />
  )
}

export default Search
