import { useState } from 'react'
import DropDownButton from '@assets/icons/dropdown_button.svg?react'
import DropUpButton from '@assets/icons/dropup_button.svg?react'
import './CategorySelect.css'

const CategorySelect = () => {
  const [showlist, setShowlist] = useState(false)
  // const [category, setCategory] = useState('');

  return (
    <div className='category'>
      <div className='category-container'>
        <button
          className='category-button'
          onClick={() => setShowlist(!showlist)}
        >
          <p className='category-title'>카테고리 선택</p>
          {showlist ? <DropUpButton /> : <DropDownButton />}
        </button>
      </div>
      {showlist && (
        <div className='category-list-container'>
          <ul className='category-list'>
            <li>이별</li>
            <li>짝사랑</li>
            <li>썸</li>
            <li>데이트</li>
            <li>기타</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategorySelect
