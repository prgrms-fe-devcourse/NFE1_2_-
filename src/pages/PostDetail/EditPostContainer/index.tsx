import PostPageButton from '@components/PostPageButton/PostPageButton'
import './index.css'
import { useCallback } from 'react'

const EditPostContainer = () => {
  const handleEdit = useCallback(() => {
    console.log('handleEdit')
  }, [])
  const handleDelete = useCallback(() => {
    console.log('handleDelete')
  }, [])

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
