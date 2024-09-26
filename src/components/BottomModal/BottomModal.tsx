import './BottomModal.css'

const BottomModal = ({ children, onClick, buttonText }: { children: JSX.Element, onClick: () => void, buttonText : string}) => {
  return (
    <div className='bottom-modal'>
      <div className='bottom-modal-line'></div>
      <div className='bottom-modal-content'>{children}</div>
      <button className='bottom-modal-button' onClick={onClick}>{buttonText}</button>
    </div>
  )
}

export default BottomModal
