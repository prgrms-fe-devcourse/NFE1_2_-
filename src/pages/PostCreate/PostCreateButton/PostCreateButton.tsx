import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './PostCreateButton.css'
import { useMutation } from '@tanstack/react-query'

interface PostData {
  category: string
  title: string
  content: string
  question: string
}

interface PostCreateProps {
  postData: PostData
  postImgUrl: string | null //수정필요
}

// interface CreatePost {
//   title: string
//   image: string | null
//   channelId: string
// }
//title: String,image: Binary | null,channelId: String
//FormData

const createPost = async (newPost: FormData) => {
  const token = 'aaaaaaaa'
  const response = await axios.post(
    'https://kdt.frontend.5th.programmers.co.kr:5001/posts/create',
    newPost,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data
}

const PostCreateButton = (props: PostCreateProps) => {
  const { postData, postImgUrl } = props
  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (result) => {
      console.log('Post created successfully:', result)
    },
    onError: (error) => {
      console.error('Error creating post:', error)
    },
  })

  const handlePostCreate = () => {
    if (!postData.category) {
      toast.error('카테고리를 입력하세요')
      return
    } else if (!postData.title.trim()) {
      toast.error('제목을 입력하세요')
      return
    } else if (!postData.content.trim()) {
      toast.error('내용을 입력하세요')
      return
    } else if (!postData.question) {
      toast.error('질문을 선택하세요')
      return
    }

    const newFormData = new FormData()
    newFormData.append('title', JSON.stringify(postData))
    if (postImgUrl) {
      newFormData.append('image', postImgUrl)
    }
    newFormData.append('channdelId', '66f4aabccdb3ce68a6a139bf')
    addPostMutation.mutate(newFormData)
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
