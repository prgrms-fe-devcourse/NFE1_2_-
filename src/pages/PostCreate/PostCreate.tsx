import { useCallback, useState } from 'react'
import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'
import AddImage from './AddImage/AddImage'
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './PostCreate.css'
import { PostDetail } from '@/typings/types'

const PostCreate = () => {
  const [postData, setPostData] = useState<PostDetail>({
    type: '기타',
    title: '',
    body: '',
    checkCount: 0,
    poll: {
      title: '',
      agree: 0,
      disagree: 0,
    },
  })

  const [postImgUrl, setPostImgUrl] = useState<string | null>(null)

  const handlePostChange = useCallback(
    (key: keyof PostDetail) => (value: string) => {
      setPostData((prevState) => ({
        ...prevState,
        [key]: value,
      }))
    },
    [],
  )

  const handlePollChange = useCallback(
    (key: keyof PostDetail['poll']) => (value: string) => {
      setPostData((prevState) => ({
        ...prevState,
        poll: {
          ...prevState.poll,
          [key]: value,
        },
      }))
    },
    [],
  )

  return (
    <DetailPageLayout>
      <div className='post-create'>
        <CategorySelect
          category={postData.type}
          onChangeCategory={handlePostChange('type')}
        />
        <PostContent
          title={postData.title}
          content={postData.body}
          onChangeTitle={handlePostChange('title')}
          onChangeContent={handlePostChange('body')}
        />
        <AddImage
          postImgUrl={postImgUrl}
          onChangeImgUrl={setPostImgUrl}
        />
        <QuestionSelect
          question={postData.poll.title}
          onChangeQuestion={handlePollChange('title')}
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
