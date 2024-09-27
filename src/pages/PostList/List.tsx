import Carousel from './Carousel/Carousel'
import MainPageLayout from '@/layouts/MainPageLayout/MainPageLayout'
import PreviewPostList from './PreviewPostList/PreviewPostList'
import FilterSection from './FilterSection/FilterSection'
const PostList = () => {
  return (
    <MainPageLayout>
      <section>
        <Carousel></Carousel>
        <FilterSection></FilterSection>
        <PreviewPostList></PreviewPostList>
      </section>
    </MainPageLayout>
  )
}

export default PostList
