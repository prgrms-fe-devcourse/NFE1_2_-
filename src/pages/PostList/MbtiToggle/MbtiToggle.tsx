import MbtiSelector_2 from '@/components/MbtiSelector/MbtiSelector_2'
import './MbtiTogle.css'

interface MbtiToggleProps {
  isMbtiFilterVisible: boolean
  onToggleFilter: () => void
  onSelect: (result: string | null) => void
  onReset: () => void
}

const MbtiToggle: React.FC<MbtiToggleProps> = ({
  isMbtiFilterVisible,
  onToggleFilter,
  onSelect,
  onReset,
}) => {
  return (
    <>
      <div className='toggle-container'>
        <label
          className={`toggle-label ${isMbtiFilterVisible ? 'active' : ''}`}
        >
          MBTI 필터링
        </label>
        <div
          className={`toggle-slider ${isMbtiFilterVisible ? 'active' : ''}`}
          onClick={onToggleFilter}
        >
          <div
            className={`slider ${isMbtiFilterVisible ? 'active' : ''}`}
          ></div>
        </div>
        <button
          className='reload-button'
          onClick={onReset}
        >
          초기화
        </button>
      </div>
      {isMbtiFilterVisible && (
        <div className='modal-filter'>
          <div>
            <MbtiSelector_2 onSelect={onSelect} />
          </div>
        </div>
      )}
    </>
  )
}

export default MbtiToggle
