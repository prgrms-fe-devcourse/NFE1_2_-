import MbtiSelector_2 from '@/components/MbtiSelector/MbtiSelector_2'
import './MbtiTogle.css'

interface MbtiToggleProps {
  isMbtiFilterVisible: boolean
  onToggleFilter: () => void
  onSelect: (result: string) => void
}

const MbtiToggle: React.FC<MbtiToggleProps> = ({
  isMbtiFilterVisible,
  onToggleFilter,
  onSelect,
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
