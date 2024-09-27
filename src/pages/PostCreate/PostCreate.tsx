import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'

import './PostCreate.css'
import AddImage from './AddImage/AddImage'
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'

const PostCreate = () => {
  return (
    <DetailPageLayout>
      <div className='post-create'>
        <CategorySelect />
        <PostContent />
        <AddImage />
        <QuestionSelect />
        <PostCreateButton />
      </div>
    </DetailPageLayout>
  )
}

export default PostCreate
