import { useState } from 'react'
import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'
import AddImage from './AddImage/AddImage'
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './PostCreate.css'

interface PostData {
  category: string
  title: string
  content: string
  question: string
}

const PostCreate = () => {
  const [postData, setPostData] = useState<PostData>({
    category: '',
    title: '',
    content: '',
    question: '',
  })

  const [postImgUrl, setPostImgUrl] = useState<string | null>(null) 

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
        <AddImage 
        postImgUrl = {postImgUrl}
        onChangeImgUrl = {setPostImgUrl}
        />
        <QuestionSelect
          question={postData.question}
          onChangeQuestion={handlePostChange('question')}
        />
        <PostCreateButton
          postData={postData}
          postImgUrl={postImgUrl}
        />
      </div>
    </DetailPageLayout>
  )
}

export default PostCreate
