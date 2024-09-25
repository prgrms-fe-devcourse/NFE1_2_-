import './AddButton.css'

interface AddButtonProps {
  title: string
  onClick: () => void
}

const AddButton = ({ title, onClick }: AddButtonProps) => {
  return (
    <button className='add-button' onClick={onClick}>
      {title}
      </button>
  );
};

export default AddButton