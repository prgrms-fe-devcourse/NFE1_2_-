import { useEffect, useState } from 'react'
import PreviewPost from '../PreviewPost/PreviewPost'
import { USER_ID } from '@/utils/api'
import './PreviewPostList.css'
import { Post } from '@/typings/types'

interface PreviewPostListProps {
  channelId: string
  selectedCategory: string | null
  isCollectionActive: boolean
  selectedSort: 'popular' | 'latest'
  searchResults?: Post[]
  selectedMbti: string | null
  hasSearched: boolean
}

const PreviewPostList = ({
  channelId,
  selectedCategory,
  isCollectionActive,
  selectedSort,
  searchResults,
  selectedMbti,
  hasSearched,
}: PreviewPostListProps) => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setPosts(searchResults)
    } else if (!searchResults || searchResults.length === 0) {
      setPosts([])
    } else {
      setPosts([])
    }
  }, [channelId, isCollectionActive, searchResults])
  if (posts.length === 0) {
    return <p className='no-posts'>검색 결과가 없습니다.</p>
  }

  //필터링
  const filteredCollection =
    hasSearched && isCollectionActive
      ? posts.filter((post) => {
          return post.author.authorId === USER_ID
        })
      : posts

  const filteredPosts = selectedCategory
    ? filteredCollection.filter((post) => {
        const titleObject =
          typeof post.title === 'string' ? JSON.parse(post.title) : post.title
        return titleObject.type === selectedCategory
      })
    : filteredCollection

  const mbtiFilteredPosts = selectedMbti
    ? filteredPosts.filter((post) => {
        const postMbti = JSON.parse(post.author.fullName).mbti
        return postMbti === selectedMbti
      })
    : filteredPosts

  const sortedPosts = mbtiFilteredPosts.sort((postA, postB) => {
    if (selectedSort === 'popular') {
      console.log(postA)
      return postB.likes.length - postA.likes.length
    } else if (selectedSort === 'latest') {
      return (
        new Date(postB.createdAt).getTime() -
        new Date(postA.createdAt).getTime()
      )
    }
    return 0
  })
  console.log(sortedPosts)

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
