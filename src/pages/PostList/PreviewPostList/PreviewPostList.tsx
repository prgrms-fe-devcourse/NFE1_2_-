import { useEffect, useState } from 'react'
import PreviewPost from '../PreviewPost/PreviewPost'
import './PreviewPostList.css'

interface PreviewPostListProps {
  channelId: string
  selectedCategory: string | null
  isCollectionActive: boolean
  authorId: string | null
  selectedSort: 'popular' | 'latest'
  searchResults?: string[] // 검색 결과의 타입을 string[]으로 변경
  selectedMbti: string | null // 선택된 MBTI 추가
}
const PreviewPostList = ({
  channelId,
  selectedCategory,
  isCollectionActive,
  authorId,
  selectedSort,
  searchResults, // 검색 결과 받기
  selectedMbti, // 선택된 MBTI 추가
}: PreviewPostListProps) => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        setError(error instanceof Error ? error.message : '오류 발생')
      } finally {
        setLoading(false)
      }
    }

    // 검색 결과가 있으면 검색 결과를 설정하고 로딩 해제
    if (searchResults && searchResults.length > 0) {
      setPosts(searchResults)
      setLoading(false)
    } else if (!searchResults || searchResults.length === 0) {
      // 검색 결과가 없을 때 전체 포스트 숨기기 처리
      setPosts([]) // 검색 결과 없으면 포스트 목록 초기화
      setLoading(false)
    } else {
      fetchPosts() // 검색 결과가 없으면 전체 포스트 가져옴
    }
  }, [channelId, isCollectionActive, authorId, searchResults])

  if (loading) {
    return <p>로딩 중...</p>
  }

  if (error) {
    return <p>오류 발생: {error}</p>
  }

  if (posts.length === 0) {
    return <p className='no-posts'>검색 결과가 없습니다.</p>
  }

  const filteredPosts = selectedCategory
    ? posts.filter((post) => JSON.parse(post.title).type === selectedCategory)
    : posts

  // MBTI 필터링 적용
  const mbtiFilteredPosts = selectedMbti
    ? filteredPosts.filter((post) => {
        const postMbti = JSON.parse(post.author.fullName).mbti // MBTI 정보가 post.title에 있다고 가정
        return postMbti === selectedMbti // 선택된 MBTI와 일치하는지 확인
      })
    : filteredPosts

  // 정렬 로직
  const sortedPosts = mbtiFilteredPosts.sort((postA, postB) => {
    if (selectedSort === 'popular') {
      return (
        JSON.parse(postB.title).checkCount - JSON.parse(postA.title).checkCount
      ) // 인기순으로 정렬s
    } else if (selectedSort === 'latest') {
      return (
        new Date(postB.createdAt).getTime() -
        new Date(postA.createdAt).getTime()
      ) // 최신순으로 정렬
    }
    return 0
  })

  return (
    <section>
      {sortedPosts.length === 0 ? (
        <p className='no-posts'>검색 결과가 없습니다.</p>
      ) : (
        sortedPosts.map((post) => (
          <PreviewPost
            key={post._id}
            post={post}
          />
        ))
      )}
    </section>
  )
}

export default PreviewPostList
