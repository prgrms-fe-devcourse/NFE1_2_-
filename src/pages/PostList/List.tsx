import { useEffect, useState } from 'react'
import Carousel from './Carousel/Carousel'
import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import PreviewPostList from './PreviewPostList/PreviewPostList'
import FilterSection from './FilterSection/FilterSection'
import Search from './Search/Search' // Search 컴포넌트 import

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCollectionActive, setIsCollectionActive] = useState(false)
  const [authorId, setAuthorId] = useState(null)
  const [selectedSort, setSelectedSort] = useState('popular')
  const [searchResults, setSearchResults] = useState([]) // 검색 결과 상태 추가
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false) // 모달 상태 추가
  const [selectedMbti, setSelectedMbti] = useState<string | null>(null) // 선택된 MBTI 상태 추가
  const [allPosts, setAllPosts] = useState([]) // 전체 포스트 상태 추가
  const [loading, setLoading] = useState(true) // 로딩 상태 추가
  const [hasSearched, setHasSearched] = useState(false) // 검색 여부 상태 추가

  // 전체 포스트 로드
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(
          `https://kdt.frontend.5th.programmers.co.kr:5001/posts/channel/66f6b3b7e5593e2a995daf1f`,
        )
        if (!response.ok)
          throw new Error('전체 포스트를 가져오는 데 실패했습니다.')
        const data = await response.json()
        setAllPosts(data) // 전체 포스트 저장
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false) // 로딩 완료
      }
    }

    // 검색을 하지 않았을 때만 전체 포스트를 로드
    if (!hasSearched) {
      fetchAllPosts()
    }
  }, [hasSearched])

  const getUserData = async (userId: string) => {
    // 유저 데이터를 가져오는 API 요청 부분
    const response = await fetch(
      `https://kdt.frontend.5th.programmers.co.kr:5001/users/${userId}`,
    )
    if (!response.ok) throw new Error('유저 데이터를 가져오는 데 실패했습니다.')
    const data = await response.json()
    return data
  }

  const formatPostData = async (post) => {
    const { author, ...restPost } = post

    const userIdArray = Object.values(author).slice(0, 24) // 배열 첫 24개의 값이 userId라고 가정
    const userId = userIdArray.join('') // 배열을 다시 문자열로 결합

    try {
      const userData = await getUserData(userId)
      return {
        ...restPost,
        author: { ...author, fullName: userData.fullName }, // fullName 추가
      }
    } catch (error) {
      console.error(`Failed to fetch fullName for userId: ${userId}`, error)
      return {
        ...restPost,
        author: { ...author, fullName: '알 수 없음' }, // 기본값 설정
      }
    }
  }

  const handleSearch = async (searchTerm: string, mbti: string | null) => {
    try {
      const response = await fetch(
        `https://kdt.frontend.5th.programmers.co.kr:5001/search/all/${searchTerm}`,
      )
      if (!response.ok) throw new Error('검색 결과를 가져오는 데 실패했습니다.')

      const data = await response.json()

      const formattedData = await Promise.all(
        data.map(async (post) => await formatPostData(post)),
      )

      setSearchResults(formattedData) // 검색 결과 저장
      setSelectedMbti(mbti) // MBTI 저장
      setHasSearched(true) // 검색을 한 것으로 설정
      setIsSearchModalOpen(false) // 검색 후 모달 닫기
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <MainPageLayout>
      <section>
        <Carousel setSelectedCategory={setSelectedCategory} />
        <FilterSection
          isCollectionActive={isCollectionActive}
          setIsCollectionActive={setIsCollectionActive}
          setAuthorId={setAuthorId}
          setSelectedSort={setSelectedSort}
        />
        <Search
          isSearchModalOpen={false}
          onClose={() => {
            setIsSearchModalOpen(false)
          }}
          onSearch={handleSearch}
        />
        {loading ? (
          <p>로딩 중...</p>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <PreviewPostList
              channelId='66f6b3b7e5593e2a995daf1f'
              selectedCategory={selectedCategory}
              isCollectionActive={isCollectionActive}
              authorId={authorId}
              selectedSort={selectedSort}
              searchResults={searchResults} // 검색 결과 전달
              selectedMbti={selectedMbti} // 선택된 MBTI 전달
            />
          ) : (
            <p>검색 결과가 없습니다.</p>
          )
        ) : (
          <PreviewPostList
            channelId='66f6b3b7e5593e2a995daf1f'
            selectedCategory={selectedCategory}
            isCollectionActive={isCollectionActive}
            authorId={authorId}
            selectedSort={selectedSort}
            searchResults={allPosts} // 전체 포스트 전달
            selectedMbti={selectedMbti} // 선택된 MBTI 전달
          />
        )}
      </section>
    </MainPageLayout>
  )
}

export default PostList
