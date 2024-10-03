
import NotFound from '@pages/NotFound/NotFound'
import PostDetailPage from '@pages/PostDetail/PostDetailPage'
import MyPage from './pages/MyPage/MyPage'
import PostCreate from './pages/PostCreate/PostCreate'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotificationPage from './pages/NotificationPage/NotificationPage'
import PostList from './pages/PostList/List'
import LoginPage from './pages/LoginPage/LoginPage'
import JoinPage from './pages/JoinPage/JoinPage'
import JoinCompletePage from './pages/JoinCompletePage/JoinCompletePage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SplashScreen from '@pages/SplashScreen/SplashScreen'
import { useState, useEffect } from 'react'


const App = () => {
  
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // 세션 스토리지 사용
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore')
    if (hasVisitedBefore) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashFinished = () => {
    sessionStorage.setItem('hasVisitedBefore', 'true')
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onFinished={handleSplashFinished} />
  }

  return (
    <>
    <Routes>
      <Route 
        path="*" 
        element={<NotFound />} />
      <Route
        path='/join'
        element={<JoinPage />}
      />
      <Route
        path='/joincomplete'
        element={<JoinCompletePage />}
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/post/:postId'
        element={<PostDetailPage />}
      />
      <Route
        path='/my'
        element={<MyPage />}
      />
      <Route
        path='/create-post'
        element={<PostCreate />}
      />
      <Route
        path='/notification'
        element={<NotificationPage />}
      />
      <Route
        path='/'
        element={<PostList />}
      />
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
