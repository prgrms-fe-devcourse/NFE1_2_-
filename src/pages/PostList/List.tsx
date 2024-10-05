import { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from './Carousel/Carousel'
import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import PreviewPostList from './PreviewPostList/PreviewPostList'
import FilterSection from './FilterSection/FilterSection'
import Search from './Search/Search'
import { useModalStore } from '@/store/ModalStore'
import { Loader2 } from 'lucide-react'
import './List.css'

const PostList = () => {
  const { isSearchModalOpen, setIsSearchModalOpen } = useModalStore()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isCollectionActive, setIsCollectionActive] = useState(false)
  const [authorId, setAuthorId] = useState<string | null>(null)
  const [selectedSort, setSelectedSort] = useState<'popular' | 'latest'>(
    'latest',
  )
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedMbti, setSelectedMbti] = useState<string | null>(null)
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 전체 포스트 로드 함수
  const fetchAllPosts = async () => {
    setIsLoading(true) // 데이터 로딩 시작
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5001/posts/channel/66f6b3b7e5593e2a995daf1f`,
      )
      setAllPosts(response.data) // 전체 포스트 저장
    } catch (error) {
      console.error('전체 포스트를 가져오는 데 실패했습니다:', error)
    } finally {
      setIsLoading(false) // 데이터 로딩 완료
    }
  }

  // 컴포넌트가 처음 로드될 때 전체 포스트 불러오기
  useEffect(() => {
    if (!hasSearched) {
      fetchAllPosts() // 포스트 로드
    }
  }, [hasSearched])

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

  const formatPostDataSearch = async (post: any) => {
    const { author, ...restPost } = post
    const userIdArray = Object.values(author).slice(0, 24)
    const userId = userIdArray.join('')
    try {
      const userData = await getUserData(userId)
      return {
        ...restPost,
        author: { ...author, fullName: userData?.fullName || '알수없음' },
      }
    } catch (error) {
      console.error(`Failed to fetch fullName for userId: ${userId}`, error)
      return {
        ...restPost,
        author: { ...author, fullName: '알 수 없음' },
      }
    }
  }

  const handleSearch = async (searchTerm: string, mbti: string | null) => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5001/search/all/${searchTerm}`,
      )
      const data = response.data
      const filteredData = data.filter(
        (post: any) => post.channel === '66f6b3b7e5593e2a995daf1f',
      )
      const formattedData = await Promise.all(
        filteredData.map(async (post: any) => await formatPostDataSearch(post)),
      )
      setSearchResults(formattedData)
      setSelectedMbti(mbti)
      setHasSearched(true)
    } catch (error) {
      console.error('검색 결과를 가져오는 데 실패했습니다:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const [resetClickedImageIndex, setResetClickedImageIndex] = useState(false)

  // 초기화 버튼을 눌렀을 때 전체 포스트를 다시 불러오는 함수
  const handleReset = () => {
    setHasSearched(false) // 검색 여부 초기화
    fetchAllPosts() // 전체 포스트 다시 로드
    setSelectedMbti(null)
    setIsCollectionActive(false)
    setSelectedCategory(null)
    setResetClickedImageIndex(true) // Carousel의 상태 초기화
    // setTimeout을 사용하여 한 번의 사이클 후 false로 변경
    setTimeout(() => {
      setResetClickedImageIndex(false)
    }, 0)
    setSelectedSort('latest')
  }

  const openSearchModal = () => {
    setIsSearchModalOpen(true)
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
  }

  return (
    <MainPageLayout>
      <section className='section-container'>
        <Carousel
          setSelectedCategory={setSelectedCategory}
          resetClickedImageIndex={resetClickedImageIndex}
        />
        <FilterSection
          isCollectionActive={isCollectionActive}
          setAuthorId={setAuthorId}
          setAllPosts={setAllPosts}
          setIsCollectionActive={setIsCollectionActive}
          setSelectedSort={setSelectedSort}
          selectedSort={selectedSort}
        />
        {isSearchModalOpen && (
          <Search
            isSearchModalOpen={isSearchModalOpen}
            onClose={closeSearchModal}
            onSearch={handleSearch}
            onReset={handleReset} // 초기화 함수 전달
          />
        )}
        {isLoading ? (
          <div className='spinner-container'>
            <Loader2 className='spinner' />
          </div>
        ) : (
          <PreviewPostList
            channelId='66f6b3b7e5593e2a995daf1f'
            selectedCategory={selectedCategory}
            isCollectionActive={isCollectionActive}
            authorId={authorId}
            selectedSort={selectedSort}
            searchResults={hasSearched ? searchResults : allPosts}
            selectedMbti={selectedMbti}
          />
        )}
      </section>
    </MainPageLayout>
  )
}

export default PostList
