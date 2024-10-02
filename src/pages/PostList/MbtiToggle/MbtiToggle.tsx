import MbtiSelector from '@/components/MbtiSelector/MbtiSelector'
import './MbtiTogle.css'

interface MbtiToggleProps {
  isMbtiFilterVisible: boolean
  onToggleFilter: () => void
}

const MbtiToggle: React.FC<MbtiToggleProps> = ({
  isMbtiFilterVisible,
  onToggleFilter,
}) => {
  return (
    <>
      <div className='toggle-container'>
        <label
          className={`toggle-label ${isMbtiFilterVisible ? 'active' : ''}`}
        >
          MBTI 필터링
        </label>{' '}
        <div
          className={`toggle-slider ${isMbtiFilterVisible ? 'active' : ''}`}
          onClick={onToggleFilter}
        >
          <div
            className={`slider ${isMbtiFilterVisible ? 'active' : ''}`}
          ></div>
        </div>
      </div>
      {isMbtiFilterVisible && (
        <div className='modal-filter'>
          <div>
            <MbtiSelector />
          </div>
        </div>
      )}
    </>
  )
}

export default MbtiToggle
