import { useRef, useState } from 'react'
import PostPageButton from '@/components/PostPageButton/PostPageButton'
import './AddImage.css'

interface AddImageProps {
  postImage: File | null
  onChangeImage: (postImage: File | null) => void
}

const AddImage = (props: AddImageProps) => {
  const { postImage, onChangeImage } = props
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const handleAddImage = () => {
    imageInputRef.current?.click()
  }

  const handleDeleteImage = () => {
    onChangeImage(null)
    setIsUpload(false)
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0] || null
    if (imgFile) {
      onChangeImage(imgFile)
      setIsUpload(true)
    }
  }
  return (
    <div className='add-image'>
      <div className='add-image-container'>
        <p className='add-image-name'>{postImage?.name}</p>
        <PostPageButton
          onClick={isUpload ? handleDeleteImage : handleAddImage}
          title={isUpload ? '사진삭제' : '사진추가'}
        />
        <input
          type='file'
          ref={imageInputRef}
          accept='image/*'
          onChange={handleChangeImage}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default AddImage
