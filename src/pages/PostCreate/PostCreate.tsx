import { useState } from 'react'
import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'
import AddImage from './AddImage/AddImage'
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './PostCreate.css'

interface PostData {
  category: string;
  title: string;
  content: string;
}

const PostCreate = () => {
  const [postData, setPostData] = useState<PostData>({
    category: '',
    title: '',
    content: '',
  })
  const [question, setQuestion] = useState<string>('')

  const handlePostChange = (key: keyof PostData) => (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }
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
        <QuestionSelect
          question={question}
          onChangeQuestion={setQuestion}
        />
        <PostCreateButton
          postData={postData}
          question={question}
        />
      </div>
    </DetailPageLayout>
  )
}

export default PostCreate
