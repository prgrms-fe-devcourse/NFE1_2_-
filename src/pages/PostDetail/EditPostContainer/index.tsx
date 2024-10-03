import PostPageButton from '@components/PostPageButton/PostPageButton'
import './index.css'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '@/utils/api'
import { toast } from 'react-toastify'

const EditPostContainer = ({ postId }: { postId: string }) => {
  const navigate = useNavigate()

  const handleEdit = useCallback(() => {
    navigate(`/create-post?postId=${postId}`)
  }, [navigate, postId])

  const handleDelete = useCallback(async () => {
    try {
      await deletePost(postId)
      navigate('/')
    } catch (error) {
      toast.error(`에러 발생 ${error}`)
    }
  }, [navigate, postId])

  return (
    <div className='edit-post-container'>
      <PostPageButton
        title='수정하기'
        onClick={handleEdit}
      />
      <PostPageButton
        title='삭제하기'
        onClick={handleDelete}
      />
    </div>
  )
}

export default EditPostContainer
