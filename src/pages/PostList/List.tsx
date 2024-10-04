import { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from './Carousel/Carousel'
import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import PreviewPostList from './PreviewPostList/PreviewPostList'
import FilterSection from './FilterSection/FilterSection'
import Search from './Search/Search' // Search 컴포넌트 import
import { useModalStore } from '@/store/ModalStore'

const PostList = () => {
  const { isSearchModalOpen, setIsSearchModalOpen } = useModalStore()

  //카테고리
  const [selectedCategory, setSelectedCategory] = useState(null)

  //내 글 모아보기, 내 글 모아보기에 필요한 userId 인기순/최신순
  const [isCollectionActive, setIsCollectionActive] = useState(false)
  const [authorId, setAuthorId] = useState(null)
  const [selectedSort, setSelectedSort] = useState('latest')

  //검색
  const [searchResults, setSearchResults] = useState([]) // 검색 결과 상태 추가
  const [selectedMbti, setSelectedMbti] = useState<string | null>(null)
  const [allPosts, setAllPosts] = useState([]) // 전체 포스트 상태 추가
  const [hasSearched, setHasSearched] = useState(false) // 검색 여부 상태 추가

  // 전체 포스트 로드 함수 (외부로 분리)
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5001/posts/channel/66f6b3b7e5593e2a995daf1f`,
      )
      setAllPosts(response.data) // 전체 포스트 저장
    } catch (error) {
      console.error('전체 포스트를 가져오는 데 실패했습니다:', error)
    }
  }

  // 컴포넌트가 처음 로드될 때 전체 포스트 불러오기
  useEffect(() => {
    if (!hasSearched) {
      fetchAllPosts()
    }
  }, [hasSearched])

  //검색 api에 반환값에 userData가 없어서 userData 붙이기
  const getUserData = async (userId: string) => {
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5001/users/${userId}`,
      )
      return response.data || null
    } catch (error) {
      console.error('유저 데이터를 가져오는 데 실패했습니다:', error)

      return null
    }
  }

  //변수명
  const formatPostDataSearch = async (post) => {
    const { author, ...restPost } = post
    const userIdArray = Object.values(author).slice(0, 24)
    const userId = userIdArray.join('')
    try {
      const userData = await getUserData(userId)
      console.log(userData)

      return {
        ...restPost,
        author: { ...author, fullName: userData?.fullName || '알수없음' }, // fullName 추가
      }
    } catch (error) {
      console.error(`Failed to fetch fullName for userId: ${userId}`, error)
      return {
        ...restPost,
        author: { ...author, fullName: '알 수 없음' }, // 기본값 설정
      }
    }
  }

  //검색 결과
  const handleSearch = async (searchTerm: string, mbti: string | null) => {
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5001/search/all/${searchTerm}`,
      )
      // 응답 데이터 가져오기
      const data = response.data
      console.log(`응답데이터: ${JSON.stringify(data, null, 2)}`)

      const filteredData = data.filter(
        (post) => post.channel === '66f6b3b7e5593e2a995daf1f',
      )

      // 포스트 데이터를 형식화
      const formattedData = await Promise.all(
        filteredData.map(async (post) => await formatPostDataSearch(post)),
      )
      setSearchResults(formattedData) // 검색 결과 저장
      console.log(formattedData)
      setSelectedMbti(mbti) // MBTI 저장
      setHasSearched(true) // 검색을 한 것으로 설정
      // setIsSearchModalOpen(false) // 검색 후 모달 닫기
    } catch (error) {
      console.error('검색 결과를 가져오는 데 실패했습니다:', error)
    }
  }

  // 초기화 버튼을 눌렀을 때 전체 포스트를 다시 불러오는 함수
  const handleReset = () => {
    setHasSearched(false) // 검색 여부 초기화
    fetchAllPosts() // 전체 포스트 다시 로드
  }

  const openSearchModal = () => {
    setIsSearchModalOpen(true)
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
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
        {isSearchModalOpen && (
          <Search
            isSearchModalOpen={isSearchModalOpen}
            onClose={closeSearchModal}
            onSearch={handleSearch}
            onReset={handleReset} // 초기화 함수 전달
          />
        )}
        <PreviewPostList
          channelId='66f6b3b7e5593e2a995daf1f'
          selectedCategory={selectedCategory}
          isCollectionActive={isCollectionActive}
          authorId={authorId}
          selectedSort={selectedSort}
          searchResults={hasSearched ? searchResults : allPosts} // 검색 결과 또는 전체 포스트 전달
          selectedMbti={selectedMbti} // 선택된 MBTI 전달
        />
        {!hasSearched && allPosts.length === 0 && <p>결과가 없습니다.</p>}
      </section>
    </MainPageLayout>
  )
}

export default PostList
