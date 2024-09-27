import { useState } from 'react'
import DropDownButton from '@assets/icons/dropdown_button.svg?react'
import DropUpButton from '@assets/icons/dropup_button.svg?react'
import './CategorySelect.css'

const CategorySelect = () => {
  const [showlist, setShowlist] = useState(false)
  const [category, setCategory] = useState('')

  const categories = ['이별', '짝사랑', '썸', '데이트', '기타']

  const selectCategory = (value: string) => {
    setCategory(value)
    setShowlist(!showlist)
  }
  return (
    <div className='category'>
      <div className='category-container'>
        <button
          className='category-button'
          onClick={() => setShowlist(!showlist)}
        >
          <p className='category-title'>
            {category === '' ? '카테고리' : category}
          </p>
          {showlist ? <DropUpButton /> : <DropDownButton />}
        </button>
      </div>
      {showlist && (
        <div className='category-list-container'>
          <ul className='category-list'>
            {categories.map((item) => (
              <li key={item} onClick={() => selectCategory(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategorySelect
