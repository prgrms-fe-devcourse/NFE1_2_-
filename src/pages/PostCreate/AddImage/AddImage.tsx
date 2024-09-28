import { useRef, useState } from 'react'
import PostPageButton from '@/components/PostPageButton/PostPageButton'
import './AddImage.css'

interface AddImageProps {
  postImgUrl: string | null
  onChangeImgUrl: (postImgUrl: string | null) => void
}

const AddImage = (props: AddImageProps) => {
  const { postImgUrl, onChangeImgUrl } = props
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const handleAddImage = () => {
    fileInput.current?.click()
  }
  const handleDeleteImage = () => {
    onChangeImgUrl(null)
    setIsUpload(false)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0]
    if (imgFile) {
      onChangeImgUrl(imgFile.name)
      setIsUpload(true)
    }
  }
  return (
    <div className='add-image'>
      <div className='add-image-container'>
        <p className='add-image-name'>{postImgUrl}</p>
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
