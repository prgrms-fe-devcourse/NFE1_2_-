import React, { useRef, useEffect } from 'react';
import './BottomModal.css'

const BottomModal = ({ children, onClick, buttonText }: { 
  children: JSX.Element, 
  onClick: () => void, 
  buttonText: string
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog ref={dialogRef} className="modal-container">
      <div className='bottom-modal'>
        <div className='bottom-modal-line'></div>
        <div className='bottom-modal-content'>{children}</div>
        <button className='bottom-modal-button' onClick={onClick}>{buttonText}</button>
      </div>
    </dialog>
  )
}

export default BottomModal