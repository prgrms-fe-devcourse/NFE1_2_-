import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import SplashScreen from '@pages/SplashScreen/SplashScreen'
import PostDetail from '@pages/PostDetail/PostDetail'
import PostDetailPage from '@pages/PostDetail/PostDetailPage'
import MyPage from './pages/MyPage/MyPage'
import PostCreate from './pages/PostCreate/PostCreate'
import NotificationPage from './pages/NotificationPage/NotificationPage'
import PostList from './pages/PostList/List'

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // 세션 스토리지를 사용
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore')
    if (!hasVisitedBefore) {
      sessionStorage.setItem('hasVisitedBefore', 'true')
      navigate('/splash')
    } else {
      setIsFirstVisit(false)
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="/splash" element={<SplashScreen />} />
      <Route path='/postdetail' element={<PostDetailPage />} />
      <Route path='/my' element={<MyPage />} />
      <Route path='/create-post' element={<PostCreate />} />
      <Route path='/notification' element={<NotificationPage />} />
      <Route path='/' element={<PostList />} />
      <Route 
        path="*" 
        element={<Navigate to={isFirstVisit ? "/splash" : "/"} replace />} 
      />
    </Routes>
  )
}

export default App