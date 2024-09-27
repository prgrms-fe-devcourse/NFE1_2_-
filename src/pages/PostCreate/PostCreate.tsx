import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'

import './PostCreate.css'
import AddImage from './AddImage/AddImage'
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import { useState } from 'react'

const PostCreate = () => {
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <DetailPageLayout>
      <div className='post-create'>
        <CategorySelect
          category={category}
          onChangeCategory={setCategory}
        />
        <PostContent
          title={title}
          content={content}
          onChangeTitle={setTitle}
          onChangeContent={setContent}
        />
        <AddImage />
        <QuestionSelect />
        <PostCreateButton />
      </div>
    </DetailPageLayout>
  )
}

export default PostCreate
