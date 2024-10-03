import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './PostCreateButton.css'
import { PostDetail } from '@/typings/types'
import { useNavigate } from 'react-router-dom'
import { createPost } from '@/utils/api'

interface PostCreateProps {
  postData: PostDetail
  postImage: File | null
}

const PostCreateButton = (props: PostCreateProps) => {
  const { postData, postImage } = props
  const navigate = useNavigate()
  const handlePostCreate = () => {
    if (postData.type === '카테고리') {
      toast.error('카테고리를 입력하세요')
      return
    } else if (!postData.title.trim()) {
      toast.error('제목을 입력하세요')
      return
    } else if (!postData.body.trim()) {
      toast.error('내용을 입력하세요')
      return
    } else if (!postData.poll.title) {
      toast.error('질문을 선택하세요')
      return
    }

    const newFormData = new FormData()
    newFormData.append('title', JSON.stringify(postData))
    if (postImage) {
      newFormData.append('image', postImage)
    }
    newFormData.append('channelId', '66f6b3b7e5593e2a995daf1f')
    createPost(newFormData)
    navigate('/')
  }

  return (
    <div className='post-create-button-container'>
      <button
        className='post-create-button'
        onClick={handlePostCreate}
      >
        글쓰기
      </button>
      <ToastContainer
        position='top-center' //알림 위치 설정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        // 마우스를 올리면 알람 정지
        theme='colored'
        // limit={1} // 알람 개수 제한
      />
    </div>
  )
}

export default PostCreateButton
