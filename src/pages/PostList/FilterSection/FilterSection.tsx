import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getMyPostList } from '@/utils/api'
import formatPostData from '@/utils/formatPostData'
import { FormattedPost, Post } from '@/typings/types'
import { useAuthStore } from '@/store/authStore'
import './FilterSection.css'

interface FilterSectionProps {
  setAllPosts: React.Dispatch<React.SetStateAction<FormattedPost[]>>
  isCollectionActive: boolean
  setIsCollectionActive: (active: boolean) => void
  selectedSort: 'popular' | 'latest'
  setSelectedSort: (sort: 'popular' | 'latest') => void
}

const FilterSection = ({
  setAllPosts,
  isCollectionActive,
  setIsCollectionActive,
  selectedSort,
  setSelectedSort,
}: FilterSectionProps) => {
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()

  //인기순/최신순
  const handleSortClick = (sortType: 'popular' | 'latest') => {
    setSelectedSort(sortType)
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
        const formattedMyPostList: FormattedPost[] = myPostList
          .map((mypost: Post) => formatPostData(mypost))
          .filter(({ channel }) => channel._id === '66f4aafbcdb3ce68a6a139c3')

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
          console.error('전체 포스트를 가져오는 데에 실패했습니다:', error)
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
