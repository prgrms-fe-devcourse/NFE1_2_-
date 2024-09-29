import PostDetail from '@pages/PostDetail/PostDetail'
import PageLoader from '@pages/Loading/PageLoader'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <PageLoader>
          <Routes>
          <Route
            path='/postdetail'
            element={<PostDetail />}
          />
        </Routes>
      </PageLoader>
    </Router>
 
  )
}

export default App
