import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@pages/Loading/Loading' 
import SplashScreen from '@pages/SplashScreen/SplashScreen'

const NotFound = lazy(() => import('@pages/NotFound/NotFound'))
const PostDetailPage = lazy(() => import('@pages/PostDetail/PostDetailPage'))
const MyPage = lazy(() => import('./pages/MyPage/MyPage'))
const PostCreate = lazy(() => import('./pages/PostCreate/PostCreate'))
const NotificationPage = lazy(() => import('./pages/NotificationPage/NotificationPage'))
const PostList = lazy(() => import('./pages/PostList/List'))
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'))
const JoinPage = lazy(() => import('./pages/JoinPage/JoinPage'))
const JoinCompletePage = lazy(() => import('./pages/JoinCompletePage/JoinCompletePage'))

const App = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path='*' 
            element={<NotFound />} />
          <Route 
            path='/join' 
            element={<JoinPage />} />
          <Route 
            path='/joincomplete' 
            element={<JoinCompletePage />} />
          <Route 
            path='/login' 
            element={<LoginPage />} />
          <Route 
            path='/post/:postId' 
            element={<PostDetailPage />} />
          <Route 
            path='/my' 
            element={<MyPage />} />
          <Route 
            path='/create-post' 
            element={<PostCreate />} />
          <Route 
            path='/notification' 
            element={<NotificationPage />} />
          <Route 
            path='/' 
            element={<PostList />} />
          <Route 
            path='*' 
            element={<Navigate to='/' replace />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  )
}

export default App