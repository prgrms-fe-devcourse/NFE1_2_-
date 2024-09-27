import { useQuery } from '@tanstack/react-query'
import PostComponent from '@components/PostComponent/PostComponent'
import LikeButton from '../LikeButton/LikeButton'
import './PostSection.css'
import axios from 'axios'

const getData = async () => {
  const response = await axios.get(
    'https://kdt.frontend.5th.programmers.co.kr:5001/posts/66f627e8d9565f243fe31876',
  )

  return response.data
}

const PostSection = () => {
  const { data } = useQuery({ queryKey: ['post'], queryFn: getData })
  if (data) {
    const { title } = data
    const postDetail = JSON.parse(title)
    const post = { ...data, title: postDetail }
    console.log(post)
    return (
      <section className='post-section'>
        <PostComponent post={post} />
        <LikeButton />
      </section>
    )
  }
}

export default PostSection
