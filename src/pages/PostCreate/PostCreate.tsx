import CategorySelect from './CategorySelect/CategorySelect'
import PostContent from './PostContent/PostContent'
import PostCreateButton from './PostCreateButton/PostCreateButton'
import QuestionSelect from './QuestionSelect/QuestionSelect'

import './PostCreate.css'
import AddImage from './AddImage/AddImage'
import Container from '@/components/Conatiner/Container'

const PostCreate = () => {
  return (
    <Container>
      <div className='post-create'>
        <CategorySelect />
        <PostContent />
        <AddImage />
        <QuestionSelect />
        <PostCreateButton />
      </div>
    </Container>
  )
}

export default PostCreate
