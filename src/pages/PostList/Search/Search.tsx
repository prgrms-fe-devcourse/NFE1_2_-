import ModalComponent from '@/pages/MyPage/Component/ModalComponent/ModalComponent'
import { useState } from 'react'
import SearchButton from '@assets/icons/list_search.svg?react'
import MbtiToggle from '@/pages/PostList/MbtiToggle/MbtiToggle'
const Search = ({
  isSearchModalOpen,
  onClose,
  onSearch,
  onReset,
}: {
  onClose: () => void
  onSearch: (searchTerm: string, mbti: string | null) => void
}) => {
  const [search, setSearch] = useState('')
  const [isMbtiFilterVisible, setIsMbtiFilterVisible] = useState(false)
  const [selectedMbti, setSelectedMbti] = useState<string | null>(null)

  const handleAdditionalReset = () => {
    onReset()
    setSearch('')
    setIsMbtiFilterVisible(false)
  }

  const handleCloseModal = () => {
    onClose()
    // setSearch('')
    // setSelectedMbti(null) // 모달 닫을 때만 MBTI 초기화
  }

  const handleSearch = () => {
    onSearch(search, selectedMbti) // 검색어와 선택된 MBTI 전달
    // handleCloseModal() // 검색 후 모달 닫기
  }

  const handleMbtiToggle = () => {
    setIsMbtiFilterVisible(!isMbtiFilterVisible) // MBTI 토글 상태만 제어
  }

  const handleMbtiSelect = (result: string) => {
    setSelectedMbti(result)
    console.log('선택된 MBTI:', result)
  }

  return (
    <ModalComponent
      isOpen={isSearchModalOpen}
      onClose={handleCloseModal} // 모달을 닫을 때만 onClose 호출
      buttonText={'닫기'}
      instruction='검색'
      detail='검색할 포스트 제목을 입력하거나, MBTI 필터링 기능을 이용해보세요.'
      filter={true}
    >
      <div className='mbti'>
        <MbtiToggle
          isMbtiFilterVisible={isMbtiFilterVisible}
          onToggleFilter={handleMbtiToggle} // 토글 상태만 제어
          onSelect={handleMbtiSelect} // 선택된 M BTI 상태 업데이트
          onReset={handleAdditionalReset} // MbtiToggle에 초기화 함수 전달
        />
      </div>
      <input
        type='text'
        className={`modal-input ${isMbtiFilterVisible ? 'active' : ''}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
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
