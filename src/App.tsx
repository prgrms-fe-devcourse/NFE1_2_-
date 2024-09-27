import PostDetail from '@pages/PostDetail/Post/Post'
import MyPage from './pages/MyPage/MyPage'
import { Routes, Route } from 'react-router-dom'
import PostList from './pages/PostList/List'
const App = () => {
  return (
    <Routes>
      <Route
        path='/postdetail'
        element={<PostDetail />}
      />
      <Route
        path='/my'
        element={<MyPage />}
      />
      <Route
        path='/'
        element={<PostList />}
      />
    </Routes>
  )
}

export default App
