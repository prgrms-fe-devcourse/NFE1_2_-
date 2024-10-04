import { useCallback, useEffect, useState } from 'react'
import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'
import AddImage from './AddImage/AddImage'
import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './PostCreate.css'
import { PostDetail } from '@/typings/types'
import { useLocation } from 'react-router-dom'
import { getPostData } from '@/utils/api'
import formatPostData from '@/utils/formatPostData'

const PostCreate = () => {
  const [postData, setPostData] = useState<PostDetail>({
    type: '카테고리',
    title: '',
    body: '',
    checkCount: 0,
    poll: {
      title: '',
      agree: [],
      disagree: [],
    },
  })
  const [postImage, setPostImage] = useState<File | null>(null)
  const [isPoll, setIsPoll] = useState<boolean>(false)
  const location = useLocation()
  const editPostId: string | null = new URLSearchParams(location.search).get(
    'postId',
  )

  const getPost = useCallback(async () => {
    const post = await getPostData(editPostId as string)
    console.log(post)
    const postData = formatPostData(post)
    console.log(postData)
    setPostData((prevState) => ({
      ...prevState,
      ['type']: postData.title.type,
      ['title']: postData.title.title,
      ['body']: postData.title.body,
      ['poll']: postData.title.poll,
    }))

    const isPollAgree = postData.title.poll.agree
    const isPollDisAgree = postData.title.poll.disagree
    if (isPollAgree.length > 0 || isPollDisAgree.length > 0) {
      setIsPoll(true)
    }
  }, [])

  useEffect(() => {
    if (editPostId) {
      getPost()
    }
  }, [editPostId])

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
          postImage={postImage}
          onChangeImage={setPostImage}
        />
        <QuestionSelect
          isPoll={isPoll}
          question={postData.poll.title}
          onChangeQuestion={handlePollChange('title')}
        />
        <PostCreateButton
          postData={postData}
          postImage={postImage}
        />
      </div>
    </DetailPageLayout>
  )
}

export default PostCreate
