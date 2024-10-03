import { useState } from 'react'
import './FilterSection.css'

interface FilterSectionProps {
  isCollectionActive: boolean
  setIsCollectionActive: (active: boolean) => void
  setAuthorId: (id: string | null) => void
  setSelectedSort: (sort: 'popular' | 'latest') => void
}

const FilterSection = ({
  isCollectionActive,
  setIsCollectionActive,
  setAuthorId,
  setSelectedSort,
}: FilterSectionProps) => {
  const [selectedSort, setSelectedSortState] = useState('popular')

  //인기순/최신순
  const handleSortClick = (sortType: 'popular' | 'latest') => {
    setSelectedSortState(sortType) //선택된 정렬 옵션에 맞게 클래스를 추가할 수 있도록 함 (로컬 상태 관리용)
    setSelectedSort(sortType) //부모 컴포넌트 상태 변경
  }

  //내 글 모아보기
  const handleCollectionClick = () => {
    setIsCollectionActive(!isCollectionActive)
    if (!isCollectionActive) {
      setAuthorId('66f36c0dcdb3ce68a6a135fc') //내글모아보기 선택되면 특정 사용자의 글만 보이도록 id설정
    } else {
      setAuthorId(null)
    }
  }

  return (
    <div className='post-collection'>
      <button
        className={`collection-title ${isCollectionActive ? 'active' : ''}`}
        onClick={handleCollectionClick}
      >
        <div className='collected-title'>내 글 모아보기</div>
      </button>
      <div className='sort-options'>
        <div
          className={`popular ${selectedSort === 'popular' ? 'active' : ''}`}
          onClick={() => handleSortClick('popular')}
        >
          인기순
        </div>
        <div
          className={`latest ${selectedSort === 'latest' ? 'active' : ''}`}
          onClick={() => handleSortClick('latest')}
        >
          최신순
        </div>
      </div>
    </div>
  )
}

export default FilterSection
