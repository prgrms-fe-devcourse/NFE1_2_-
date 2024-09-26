import CategorySelect from './CategorySelect'
import PostContent from './PostContent'
import PostCreateButton from './PostCreateButton'
import QuestionSelect from './QuestionSelect'

import './PostCreate.css'
import PostPageButton from '@/components/PostPageButton/PostPageButton'

const PostCreate = () => {
  const handleAddPhoto = () => {}
  return (
    <div className='post-create'>
      <CategorySelect />
      <PostContent />
      <div className='add-image'>
        <div className='add-image-container'>
          <p className='add-image-name'>ddd.jpg</p>
          <PostPageButton onClick={handleAddPhoto} title='사진추가'/>
        </div>
      </div>
      <QuestionSelect />
      <PostCreateButton />
    </div>
  )
}

export default PostCreate
