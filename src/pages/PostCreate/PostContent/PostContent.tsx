import './PostContent.css'

const PostContent = () => {
  return (
    <div className='title-content'>
        <input type='text' placeholder='제목을 입력하세요' className="title-input"/>
        <textarea placeholder='내용을 입력하세요' className='content-input'/>
    </div>
  );
};

export default PostContent;