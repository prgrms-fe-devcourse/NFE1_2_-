import BackButton from '@assets/icons/back_button.svg?react'
import './TopNavigator.css'
import { useNavigate } from 'react-router-dom'

const TopNavigator = ({ pageText }: { pageText?: string }) => {
  const navigate = useNavigate()

  const handleBackPage = () => {
    navigate(-1)
  }

  return (
    <div className='top-navigator'>
      <button className='back-button' onClick={handleBackPage}>
        <BackButton />
      </button>
      {pageText && <p>{pageText}</p>}
    </div>
  )
}

export default TopNavigator
