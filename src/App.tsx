import PostDetail from '@pages/PostDetail/Post/Post'
import MyPage from './pages/MyPage/MyPage'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
const App = () => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={<LoginPage />} />
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
