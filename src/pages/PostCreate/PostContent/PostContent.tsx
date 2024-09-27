import './PostContent.css'

interface PostContentProps {
  title: string
  content: string
  onChangeTitle: (title: string) => void
  onChangeContent: (content: string) => void
}

const PostContent = (props: PostContentProps) => {
  const { title, content, onChangeTitle, onChangeContent } = props
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(e.target.value)
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeContent(e.target.value)
  }

  return (
    <div className='title-content'>
      <input
        type='text'
        value={title}
        placeholder='제목을 입력하세요'
        className='title-input'
        onChange={handleTitleChange}
      />
      <textarea
        value={content}
        placeholder='내용을 입력하세요'
        className='content-input'
        onChange={handleContentChange}
      />
    </div>
  )
}

export default PostContent
