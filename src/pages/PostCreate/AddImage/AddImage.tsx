import PostPageButton from '@/components/PostPageButton/PostPageButton'
import './AddImage.css'
import { useRef, useState } from 'react'

const AddImage = () => {
  const [uploadImgUrl, setUploadImgUrl] = useState<string>('')
  const [isUpload, setIsUpload] = useState(false)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const handleAddImage = () => {
    fileInput.current?.click()
  }
  const handleDeleteImage = () => {
    setUploadImgUrl('')
    setIsUpload(false)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0]
    if (imgFile) {
      setUploadImgUrl(imgFile.name)
      setIsUpload(true)
    }
  }
  return (
    <div className='add-image'>
      <div className='add-image-container'>
        <p className='add-image-name'>{uploadImgUrl}</p>
        <PostPageButton
          onClick={isUpload ? handleDeleteImage : handleAddImage}
          title={isUpload ? '사진삭제' : '사진추가'}
        />
        <input
          type='file'
          ref={fileInput}
          accept='image/*'
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default AddImage
