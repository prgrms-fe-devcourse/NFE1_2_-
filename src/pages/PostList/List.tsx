import Carousel from './Carousel/Carousel'
import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import PreviewPostList from './PreviewPostList/PreviewPostList'
import FilterSection from './FilterSection/FilterSection'
import { useState } from 'react'

//유저인증가져와야댐 일단은 그냥 아이디 적기

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCollectionActive, setIsCollectionActive] = useState(false)
  const [authorId, setAuthorId] = useState(null)
  const [selectedSort, setSelectedSort] = useState('popular') // 추가된 상태

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
        <PreviewPostList
          channelId='66f6b3b7e5593e2a995daf1f'
          selectedCategory={selectedCategory}
          isCollectionActive={isCollectionActive}
          authorId={authorId}
          selectedSort={selectedSort}
        />
      </section>
    </MainPageLayout>
  )
}

export default PostList
