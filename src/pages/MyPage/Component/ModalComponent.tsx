import BottomModal from '@/components/BottomModal/BottomModal'
import '../MyPage.css'
import MbtiSelector from '@/components/MbtiSelector/MbtiSelector'
import SearchButton from '@assets/icons/list_search.svg?react'

interface ModalSectionProps {
  isOpen: boolean
  onClose: () => void
  buttonText: string
  detail?: string
  instruction: string
  filter?: boolean
  isMbtiFilterVisible?: boolean
  onToggleFilter?: () => void
  inputFields: {
    label: string
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    placeholder?: string
  }[]
}

const ModalComponent = ({
  isOpen,
  onClose,
  buttonText,
  detail,
  filter,
  instruction,
  inputFields,
  isMbtiFilterVisible,
  onToggleFilter,
}: ModalSectionProps) => {
  return (
    <>
      {isOpen && (
        <BottomModal
          onClick={onClose}
          buttonText={buttonText}
        >
          <div className='modal-section'>
            <p className='modal-instruction'>{instruction}</p>
            <p className='modal-label'>{detail}</p>
            {filter && (
              <>
                <div className='toggle-container'>
                  <label className='toggle-label'>MBTI 필터링</label>
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
            )}
            <div className='modal-inner-section'>
              {inputFields.map((field, index) => (
                <div key={index}>
                  <p className='modal-label'>{field.label}</p>
                  <input
                    type={field.type || 'text'}
                    className={filter ? 'modal-input-filter' : 'modal-input'}
                    value={field.value}
                    onChange={field.handleChange}
                    placeholder={field.placeholder}
                  />
                  {filter && (
                    <button className='search-button'>
                      <SearchButton />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </BottomModal>
      )}
    </>
  )
}

export default ModalComponent
