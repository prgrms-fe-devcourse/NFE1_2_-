import PostPageButton from "@/components/PostPageButton/PostPageButton";
import './AddImage.css'

const AddImage = () => {
  const handleAddPhoto = () => {}
  return (
    <div className='add-image'>
      <div className='add-image-container'>
      <p className='add-image-name'>ddd.jpg</p>
      <PostPageButton onClick={handleAddPhoto} title='사진추가'/>
      </div>
  </div>
  );
};

export default AddImage;