import { useState } from 'react'
import './FilterSection.css'

const FilterSection = () => {
  const [selectedSort, setSelectedSort] = useState('popular')
  const [isCollectionActive, setCollectionActive] = useState(false)

  const handleSortClick = (sortType: string) => {
    setSelectedSort(sortType)
  }

  const handleCollectionClick = () => {
    setCollectionActive(!isCollectionActive)
  }
  return (
    <div className='post-collection'>
      <div
        className={`collection-title ${isCollectionActive ? 'active' : ''}`}
        onClick={handleCollectionClick}
      >
        <div className='collected-title'>내 글 모아보기</div>
      </div>
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
