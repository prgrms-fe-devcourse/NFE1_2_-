import CategorySelect from "./CategorySelect"
import PostContent from "./PostContent"

import './PostCreate.css'

const PostCreate = () => {
  return (
    <div className='post-create'>
      <CategorySelect />
      <PostContent />
    </div>
  )
}

export default PostCreate