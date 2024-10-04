import PostCard from '@/components/PostComponent/PostComponent'
import Interaction from '../Interaction/Interaction'
import { FormattedPost, Post } from '@/typings/types'
import { useNavigate } from 'react-router-dom'
import formatPostData from '@/utils/formatPostData'
import { useAuthStore } from '@/store/authStore'
import { formatFormData, UpdatePost, updatePost } from '@/utils/api'

const PreviewPost = ({ post }: { post: Post }) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()

  const formattedPost: FormattedPost = formatPostData(post)
  const { channel, image, title, _id } = formattedPost

  const handlePostClick = async () => {
    if (isLoggedIn) {
      const updateData: UpdatePost = {
        channelId: channel._id ? channel._id : formattedPost.channel,
        image: image as string,
        title: JSON.stringify({ ...title, checkCount: title.checkCount + 1 }),
        postId: _id,
      }

      const formData = formatFormData(updateData)
      await updatePost(formData).then(() => {
        navigate(`/post/${_id}`)
      })
    } else {
      navigate(`/login`)
    }
  }
  return (
    <section
      className='post-section'
      onClick={handlePostClick}
      style={{ cursor: 'pointer' }}
    >
      <PostCard
        post={formatPostData(post)}
        truncate={true}
        checkCount={title.checkCount}
      />
      <Interaction post={formatPostData(post)} />
    </section>
  )
}

export default PreviewPost
