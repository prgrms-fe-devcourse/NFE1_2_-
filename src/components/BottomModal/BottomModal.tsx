import { useRef, useEffect, useState } from 'react';
import './BottomModal.css'

const BottomModal = ({ children, onClick, buttonText }: { 
  children: JSX.Element, 
  onClick: () => void, 
  buttonText: string
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      setTimeout(() => setIsOpen(true), 50);
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      dialogRef.current?.close();
      onClick();
    }, 300);
  };

  return (
    <dialog ref={dialogRef} className="modal-container">
      <div ref={modalRef} className={`bottom-modal ${isOpen ? 'open' : ''}`}>
        <div className='bottom-modal-line'></div>
        <div className='bottom-modal-content'>{children}</div>
        <button className='bottom-modal-button' onClick={handleClose}>{buttonText}</button>
      </div>
    </dialog>
  )
}

export default BottomModal