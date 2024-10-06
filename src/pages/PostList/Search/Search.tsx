import { useState } from 'react'
import ModalComponent from '@/pages/MyPage/Component/ModalComponent/ModalComponent'
import SearchButton from '@assets/icons/list_search.svg?react'
import MbtiToggle from '@/pages/PostList/MbtiToggle/MbtiToggle'
import './Search.css'

interface SearchProps {
  isSearchModalOpen: boolean
  onClose: () => void
  onSearch: (searchTerm: string, mbti: string | null) => void
  onReset: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const Search: React.FC<SearchProps> = ({
  isSearchModalOpen,
  onClose,
  onSearch,
  onReset,
  searchTerm,
  setSearchTerm,
}: {
  onClose: () => void
  onSearch: (searchTerm: string, mbti: string | null) => void
}) => {
  const [isMbtiFilterVisible, setIsMbtiFilterVisible] = useState(false)
  const [selectedMbti, setSelectedMbti] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAdditionalReset = () => {
    onReset()
    setSearchTerm('')
    setIsMbtiFilterVisible(false)
    setErrorMessage('')
  }

  const handleCloseModal = () => {
    onClose()
  }

  const handleSearch = () => {
    if (searchTerm === '') {
      setErrorMessage('검색어를 입력해주세요')
    } else {
      setErrorMessage('')
      onSearch(searchTerm, selectedMbti)
      handleCloseModal()
    }
  }

  const handleMbtiToggle = () => {
    setIsMbtiFilterVisible(!isMbtiFilterVisible)
    setSelectedMbti(null)
  }

  const handleMbtiSelect = (result: string) => {
    setSelectedMbti(result)
  }

  return (
    <ModalComponent
      isOpen={isSearchModalOpen}
      onClose={handleCloseModal}
      buttonText={'닫기'}
      instruction='검색'
      detail='검색할 포스트 제목을 입력하거나, MBTI 필터링 기능을 이용해보세요.'
      filter={true}
    >
      <div className='mbti'>
        <MbtiToggle
          isMbtiFilterVisible={isMbtiFilterVisible}
          onToggleFilter={handleMbtiToggle}
          onSelect={handleMbtiSelect}
          onReset={handleAdditionalReset}
        />
      </div>
      <div>
        <input
          type='text'
          className={`modal-input ${isMbtiFilterVisible ? 'active' : ''}`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            if (errorMessage) {
              setErrorMessage('')
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
