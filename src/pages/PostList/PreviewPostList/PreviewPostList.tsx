import { useEffect, useState } from 'react'
import PreviewPost from '../PreviewPost/PreviewPost'
import './PreviewPostList.css'

interface PreviewPostListProps {
  channelId: string
  selectedCategory: string | null
  isCollectionActive: boolean
  authorId: string | null
  selectedSort: 'popular' | 'latest'
}

const PreviewPostList = ({
  channelId,
  selectedCategory,
  isCollectionActive,
  authorId,
  selectedSort,
}: PreviewPostListProps) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = isCollectionActive
          ? `https://kdt.frontend.5th.programmers.co.kr:5001/posts/author/${authorId}`
          : `https://kdt.frontend.5th.programmers.co.kr:5001/posts/channel/${channelId}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('포스트를 가져오는 데 실패했습니다.')
        }
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [channelId, isCollectionActive, authorId])

  const filteredPosts = selectedCategory
    ? posts.filter((post) => JSON.parse(post.title).type === selectedCategory)
    : posts

  // 정렬 로직인데 아직 확인 x
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (selectedSort === 'popular') {
      return JSON.parse(b.title).checkCount - JSON.parse(a.title).checkCount // 인기순으로 정렬
    } else if (selectedSort === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt) // 최신순으로 정렬
    }
    return 0
  })

  return (
    <section>
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <PreviewPost
            key={post._id}
            post={post}
          />
        ))
      ) : (
        <p className='no-posts'>해당 카테고리에 포스트가 없습니다.</p>
      )}
    </section>
  )
}

export default PreviewPostList
