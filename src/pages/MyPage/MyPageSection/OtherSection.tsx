
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../MyPage.css'
import { logoutUser } from '@/utils/api'
import { useAuthStore } from '@/store/authStore'

const OtherSection = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout) 
  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()  // zustand저장소 logout() 호출
      navigate('/')
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error)
      toast.error('로그아웃 중 오류가 발생하였습니다', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className='logout-section'>
        <button className='logout-btn' onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default OtherSection