import PostDetail from '@pages/PostDetail/Post/Post'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route
        path='/postdetail'
        element={<PostDetail />}
      />
    </Routes>
  )
}

export default App
