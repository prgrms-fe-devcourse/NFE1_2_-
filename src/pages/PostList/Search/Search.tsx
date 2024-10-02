// Search.tsx
import ModalComponent from '@/pages/MyPage/Component/ModalComponent/ModalComponent'
import { useState } from 'react'
import SearchButton from '@assets/icons/list_search.svg?react'
import MbtiToggle from '@/pages/PostList/MbtiToggle/MbtiToggle'

const Search = ({
  isSearchModalOpen,
  onClose,
  onSearch,
}: {
  onClose: () => void
  onSearch: (searchTerm: string) => void
}) => {
  const [search, setSearch] = useState('')
  const [isMbtiFilterVisible, setIsMbtiFilterVisible] = useState(false)

  const handleCloseModal = () => {
    onClose()
    setSearch('')
    setIsMbtiFilterVisible(false)
  }

  const handleSearch = () => {
    onSearch(search) // 검색어를 전달
    handleCloseModal() // 모달 닫기
  }

  return (
    <ModalComponent
      isOpen={true}
      onClose={handleCloseModal}
      buttonText={'닫기'}
      instruction='검색'
      detail='검색할 포스트 제목을 입력하거나, MBTI 필터링 기능을 이용해보세요.'
      filter={true}
    >
      <div className='mbti'>
        <MbtiToggle
          isMbtiFilterVisible={isMbtiFilterVisible}
          onToggleFilter={() => setIsMbtiFilterVisible(!isMbtiFilterVisible)}
        />
      </div>
      <input
        type='text'
        className={`modal-input ${isMbtiFilterVisible ? 'active' : ''}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='검색어를 입력해주세요'
      />
      <button
        className='search-button'
        onClick={handleSearch}
      >
        <SearchButton />
      </button>
    </ModalComponent>
  )
}

export default Search
