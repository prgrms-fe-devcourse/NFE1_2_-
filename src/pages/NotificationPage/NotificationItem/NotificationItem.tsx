import './NotificationItem.css'
import Popular from '@assets/icons/notification_congratulation.svg?react'

const NotificationItem = () => {
  return (
    <div className='notification-item-container'>
      <div className='notification-item'>
        <Popular />
        <div className='notification-text-container'>
          <p className='notification-text'>
            “왜 만나는거야? 왜만나는거야?” 댓글에 좋아요가 달렸어요.
          </p>
          <p className='notification-time'>1시간</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
