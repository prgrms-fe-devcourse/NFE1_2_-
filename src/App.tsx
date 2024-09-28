import PostDetailPage from '@pages/PostDetail/PostDetailPage'
import MyPage from './pages/MyPage/MyPage'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route
        path='/postdetail'
        element={<PostDetailPage />}
      />
      <Route
        path='/my'
        element={<MyPage />}
      />
    </Routes>
  )
}

export default App
