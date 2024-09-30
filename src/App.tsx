import PostDetail from '@pages/PostDetail/Post/Post'
import MyPage from './pages/MyPage/MyPage'
import PostCreate from './pages/PostCreate/PostCreate'
import { Routes, Route } from 'react-router-dom'

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
        path='/create-post'
        element={<PostCreate />}
      />
    </Routes>
  )
}

export default App
