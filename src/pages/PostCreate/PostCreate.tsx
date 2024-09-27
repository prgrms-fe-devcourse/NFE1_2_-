import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'

import './PostCreate.css'
import AddImage from './AddImage/AddImage'
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import { useState } from 'react'

const PostCreate = () => {
  const [postData, setPostData] = useState({
    category: '',
    title: '',
    content: '',
  })

  const handlePostChange = (key : string) => (value : string) => {
    setPostData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  console.log(postData)
  return (
    <DetailPageLayout>
      <div className='post-create'>
        <CategorySelect
          category={postData.category}
          onChangeCategory={handlePostChange('category')}
        />
        <PostContent
          title={postData.title}
          content={postData.content}
          onChangeTitle={handlePostChange('title')}
          onChangeContent={handlePostChange('content')}
        />
        <AddImage />
        <QuestionSelect />
        <PostCreateButton />
      </div>
    </DetailPageLayout>
  )
}

export default PostCreate
