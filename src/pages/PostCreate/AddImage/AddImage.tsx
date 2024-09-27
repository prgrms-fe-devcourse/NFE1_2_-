import PostPageButton from '@/components/PostPageButton/PostPageButton'
import './AddImage.css'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddImage = () => {
  const [uploadImgUrl, setUploadImgUrl] = useState<string>('')
  const fileInput = useRef<HTMLInputElement | null>(null)
  const handleAddImage = () => {
    fileInput.current?.click()
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0]
    if (imgFile) {
      if (!imgFile.type.startsWith('image/')) {
        toast.error('이미지 파일만 업로드 가능합니다.')
        return
      }
      setUploadImgUrl(imgFile.name)
    }
  }
  return (
    <div className='add-image'>
      <div className='add-image-container'>
        <p className='add-image-name'>{uploadImgUrl}</p>
        <PostPageButton
          onClick={handleAddImage}
          title={uploadImgUrl === '' ? '사진추가' : '사진삭제'}
        />
        <input
          type='file'
          ref={fileInput}
          accept='image/*'
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme='colored'
        />
      </div>
    </div>
  )
}

export default AddImage
