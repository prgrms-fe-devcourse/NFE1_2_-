import BottomModal from '@/components/BottomModal/BottomModal'
import '../MyPage.css'

interface ModalSectionProps {
  isOpen: boolean
  onClose: () => void
  buttonText: string
  instruction: string
  inputFields: {
    label: string
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
  }[]
}

const ModalComponent = ({
  isOpen,
  onClose,
  buttonText,
  instruction,
  inputFields,
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
            <div className='modal-inner-section'>
              {inputFields.map((field, index) => (
                <div key={index}>
                  <p className='modal-label'>{field.label}</p>
                  <input
                    type={field.type || 'text'}
                    className='modal-input'
                    value={field.value}
                    onChange={field.handleChange}
                  />
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
