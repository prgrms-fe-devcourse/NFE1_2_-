import PostDetailPage from '@pages/PostDetail/PostDetailPage'
import MyPage from './pages/MyPage/MyPage'
import PostCreate from './pages/PostCreate/PostCreate'
import { Routes, Route } from 'react-router-dom'
import NotificationPage from './pages/NotificationPage/NotificationPage'
import PostList from './pages/PostList/List'
import LoginPage from './pages/LoginPage/LoginPage'
import JoinPage from './pages/JoinPage/JoinPage'
import JoinCompletePage from './pages/JoinCompletePage/JoinCompletePage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <Routes>
      <Route
        path='/join'
        element={<JoinPage />}
      />
      <Route 
        path="/joincomplete" 
        element={<JoinCompletePage />} />
      <Route
        path='/login'
        element={<LoginPage/>}
      />
      <Route
        path='/postdetail'
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
     
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
