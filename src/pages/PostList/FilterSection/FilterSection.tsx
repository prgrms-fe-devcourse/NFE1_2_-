import './FilterSection.css'
import { getMyPostList } from '@/utils/api'
import formatPostData from '@/utils/formatPostData'
import { FormattedPost, Post } from '@/typings/types'
import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

interface FilterSectionProps {
  isCollectionActive: boolean
  setIsCollectionActive: (active: boolean) => void
  setAuthorId: (id: string | null) => void
  setSelectedSort: (sort: 'popular' | 'latest') => void
  selectedSort: 'popular' | 'latest'
}

const FilterSection = ({
  isCollectionActive,
  selectedSort,
  setSelectedSort,
  setAllPosts,
  setIsCollectionActive,
}: FilterSectionProps) => {
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()

  //인기순/최신순
  const handleSortClick = (sortType: 'popular' | 'latest') => {
    setSelectedSort(sortType) //부모 컴포넌트 상태 변경
  }

  //내 글 모아보기
  const handleCollectionClick = async () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    if (!isCollectionActive) {
      const myPostList = await getMyPostList()
      if (myPostList) {
        const formattedMyPostList: FormattedPost[] = myPostList.map(
          (mypost: Post) => formatPostData(mypost),
        )

        setAllPosts(formattedMyPostList)
        setIsCollectionActive(true)
      }
    } else {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `https://kdt.frontend.5th.programmers.co.kr:5001/posts/channel/66f4aafbcdb3ce68a6a139c3`,
          )
          const formattedPostList: FormattedPost[] = response.data.map(
            (post: Post) => formatPostData(post),
          )
          setAllPosts(formattedPostList)
          setIsCollectionActive(false)
        } catch (error) {
          console.error('전체 포스트를 가져오는 데 실패했습니다:', error)
        }
      }
    }
  }

  return (
    <div className='post-collection'>
      <button
        className={`collection-title ${isCollectionActive ? 'active' : ''}`}
        onClick={handleCollectionClick}
      >
        <div className='collected-title'>
          {' '}
          {isLoggedIn ? '내 글 모아보기' : '로그인'}
        </div>
      </button>
      <div className='sort-options'>
        <div
          className={`latest ${selectedSort === 'latest' ? 'active' : ''}`}
          onClick={() => handleSortClick('latest')}
        >
          최신순
        </div>
        <div
          className={`popular ${selectedSort === 'popular' ? 'active' : ''}`}
          onClick={() => handleSortClick('popular')}
        >
          인기순
        </div>
      </div>
    </div>
  )
}

export default FilterSection
