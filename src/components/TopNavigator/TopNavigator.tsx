import BackButton from '@assets/icons/back_button.svg?react'
import './TopNavigator.css'
import { useNavigate } from 'react-router-dom'

const TopNavigator = ({
  pageText,
  newPath,
}: {
  pageText?: string
  newPath?: boolean
}) => {
  const navigate = useNavigate()

  const handleBackPage = () => {
    if (newPath) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className='top-navigator'>
      <button
        className='back-button'
        onClick={handleBackPage}
      >
        <BackButton
          width={30}
          height={30}
        />
      </button>
      {pageText && <p>{pageText}</p>}
    </div>
  )
}

export default TopNavigator
