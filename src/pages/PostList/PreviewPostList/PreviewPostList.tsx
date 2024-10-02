import { useEffect, useState } from 'react'
import PreviewPost from '../PreviewPost/PreviewPost'
import './PreviewPostList.css'

interface PreviewPostListProps {
  channelId: string
  selectedCategory: string | null
  isCollectionActive: boolean
  authorId: string | null
  selectedSort: 'popular' | 'latest'
  searchResults?: string
}

const PreviewPostList = ({
  channelId,
  selectedCategory,
  isCollectionActive,
  authorId,
  selectedSort,
  searchResults, // 검색 결과 받기
}: PreviewPostListProps) => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (searchResults.length > 0) {
      // 검색 결과가 있으면 검색 결과를 바로 설정
      console.log('검색 결과:', searchResults) // 검색 결과 확인
      setPosts(searchResults)
      setLoading(false)
      return
    }

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
        setError(error instanceof Error ? error.message : '오류 발생')
      } finally {
        setLoading(false)
      }
    }

    if (!searchResults.length) {
      fetchPosts()
    }
  }, [channelId, isCollectionActive, authorId, searchResults])

  if (loading) {
    return <p>로딩 중...</p>
  }

  if (error) {
    return <p>오류 발생: {error}</p>
  }

  const filteredPosts = selectedCategory
    ? posts.filter((post) => JSON.parse(post.title).type === selectedCategory)
    : posts

  // 정렬 로직
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (selectedSort === 'popular') {
      return JSON.parse(b.title).checkCount - JSON.parse(a.title).checkCount // 인기순으로 정렬
    } else if (selectedSort === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // 최신순으로 정렬
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
