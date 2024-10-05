import ModalComponent from '@/pages/MyPage/Component/ModalComponent/ModalComponent'
import './Search.css'
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
  const [errorMessage, setErrorMessage] = useState('')

  const handleAdditionalReset = () => {
    onReset()
    setSearch('')
    setIsMbtiFilterVisible(false)
    setErrorMessage('')
  }

  const handleCloseModal = () => {
    onClose()
    // setSearch('')
    // setSelectedMbti(null) // 모달 닫을 때만 MBTI 초기화
  }

  const handleSearch = () => {
    if (search === '') {
      setErrorMessage('검색어를 입력해주세요')
    } else {
      setErrorMessage('') // 에러 메시지 초기화
      onSearch(search, selectedMbti) // 검색어와 선택된 MBTI 전달
      // handleCloseModal(); // 검색 후 모달 닫기
    }
  }

  const handleMbtiToggle = () => {
    setIsMbtiFilterVisible(!isMbtiFilterVisible) // MBTI 토글 상태만 제어
    setSelectedMbti(null)
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
      <div>
        <input
          type='text'
          className={`modal-input ${isMbtiFilterVisible ? 'active' : ''}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (errorMessage) {
              setErrorMessage('') // 입력 시작 시 에러 메시지 초기화
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
          placeholder='검색어를 입력해주세요'
        />
        <button
          className={`search-button ${errorMessage ? 'active' : ''}`}
          onClick={handleSearch}
        >
          <SearchButton />
        </button>
      </div>
      {errorMessage && (
        <p className={`error-message ${isMbtiFilterVisible ? 'active' : ''}`}>
          검색어는 필수로 입력해주세요.
        </p>
      )}
    </ModalComponent>
  )
}

export default Search
