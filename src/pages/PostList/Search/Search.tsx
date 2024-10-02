import ModalComponent from '@/pages/MyPage/Component/ModalComponent/ModalComponent'
import { useState } from 'react'
import SearchButton from '@assets/icons/list_search.svg?react'
import MbtiToggle from '@/pages/PostList/MbtiToggle/MbtiToggle'

const Search = ({ onClose }: { onClose: () => void }) => {
  const [search, setSearch] = useState('')
  const [isMbtiFilterVisible, setIsMbtiFilterVisible] = useState(false)

  const handleCloseModal = () => {
    onClose()
    setSearch('')
    setIsMbtiFilterVisible(false)
  }

  const inputFields = [
    {
      label: '',
      value: search,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value),
      type: 'text',
      placeholder: '검색어를 입력해주세요',
    },
  ]

  const handleToggleFilter = () => {
    setIsMbtiFilterVisible((prev) => !prev)
  }

  return (
    <ModalComponent
      isOpen={true}
      onClose={handleCloseModal}
      buttonText={'닫기'}
      instruction='검색'
      detail='검색할 포스트 제목을 입력하거나, MBTI 필터링 기능을 이용해보세요.'
      filter={true}
      inputFields={inputFields}
      isMbtiFilterVisible={isMbtiFilterVisible}
      onToggleFilter={handleToggleFilter}
    >
      <div className='mbti'>
        <MbtiToggle
          isMbtiFilterVisible={isMbtiFilterVisible}
          onToggleFilter={handleToggleFilter}
        />
      </div>
      <input
        type='text'
        className={`modal-input ${isMbtiFilterVisible ? 'active' : ''}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='검색어를 입력해주세요'
      />
      <button className='search-button'>
        <SearchButton />
      </button>
    </ModalComponent>
  )
}

export default Search
