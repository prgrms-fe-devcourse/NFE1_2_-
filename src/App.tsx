import SplashScreen from '@pages/SplashScreen/SplashScreen'
import PostDetail from '@pages/PostDetail/PostDetail'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
       <Route 
        path="/" 
        element={<SplashScreen />} />
      <Route
        path='/postdetail'
        element={<PostDetail />}
      />
    </Routes>
  )
}

export default App
