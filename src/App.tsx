import PostDetail from '@pages/PostDetail/PostDetail'
import { Routes, Route } from 'react-router-dom'
import MyPage from './pages/MyPage/MyPage'

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
    </Routes>
  )
}

export default App
