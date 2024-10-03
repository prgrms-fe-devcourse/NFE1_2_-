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

  const handleSortClick = (sortType) => {
    setSelectedSortState(sortType)
    setSelectedSort(sortType)
  }

  const handleCollectionClick = () => {
    setIsCollectionActive(!isCollectionActive)
    if (!isCollectionActive) {
      setAuthorId('66f36c0dcdb3ce68a6a135fc')
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
