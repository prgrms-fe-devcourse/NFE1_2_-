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
import axios from 'axios'
import Loading from '@/pages/Loading/Loading'

const PostCreate = () => {
  const getImageFile = async (imageUrl: string) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'blob',
      })
      const postValue = imageUrl.split('/post/')[1]
      const file = new File([response.data], postValue, {
        type: response.data.type,
      })
      setPostImage(file)
    } catch (error) {
      console.error('Error image as file:', error)
    }
  }

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
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const [isImgDelete, setIsImgDelete] = useState<boolean>(false)
  const [imagePublicId, setImagePublicId] = useState<string>('')
  const [isPoll, setIsPoll] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const location = useLocation()
  const editPostId: string | null = new URLSearchParams(location.search).get(
    'postId',
  )

  const getPost = useCallback(async () => {
    const post = await getPostData(editPostId as string)
    const postData = formatPostData(post)
    const isPollAgree = postData.title.poll.agree
    const isPollDisAgree = postData.title.poll.disagree
    setPostData((prevState) => ({
      ...prevState,
      ['type']: postData.title.type,
      ['title']: postData.title.title,
      ['body']: postData.title.body,
      ['checkCount']: postData.title.checkCount,
      ['poll']: postData.title.poll,
    }))
    if (postData.image) {
      setIsUpload(true)
      getImageFile(postData.image)
      setImagePublicId(postData.imagePublicId as string)
    }

    if (isPollAgree.length > 0 || isPollDisAgree.length > 0) {
      setIsPoll(true)
    }
  }, [])

  useEffect(() => {
    if (editPostId) {
      getPost()
      setIsEdit(true)
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
  return isLoading ? (
    <Loading />
  ) : (
    <DetailPageLayout newPath={true}>
      <div className='post-create-wrapper'>
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
            isUpload={isUpload}
            onChangeUpload={setIsUpload}
            onChangeImgDelete={setIsImgDelete}
            postImage={postImage}
            onChangeImage={setPostImage}
          />
          <QuestionSelect
            isPoll={isPoll}
            category={postData.type}
            question={postData.poll.title}
            onChangeQuestion={handlePollChange('title')}
          />
        </div>
        <PostCreateButton
          isEdit={isEdit}
          isImgDelete={isImgDelete}
          imagePublicId={imagePublicId}
          postId={editPostId}
          postData={postData}
          postImage={postImage}
          onChangeLoading={setIsLoading} // 로딩 상태를 변경할 수 있는 props 전달
        />
      </div>
    </DetailPageLayout>
  )
}

export default PostCreate
