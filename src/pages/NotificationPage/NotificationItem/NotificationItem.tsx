import './NotificationItem.css'
import { Notification } from '@/typings/types'
import Popular from '@assets/icons/notification_congratulation.svg?react'
import Comment from '@assets/icons/notification_comment.svg?react'
import Like from '@assets/icons/notification_like.svg?react'
import formatTime from '@/utils/formatTime'

interface NotificationItemProps {
  notification: Notification
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const notificationIcon = () => {
    if (notification.like !== undefined) {
      return <Like />
    } else if (notification.comment !== undefined) {
      return <Comment />
    }
    return <Popular />
  }
  const notificationText = () => {
    if (notification.like !== undefined) {
      return `~에 좋아요가 달렸어요.`
    } else if (notification.comment !== undefined) {
      return `~에 댓글이 달렸어요.`
    }
  }
  const notificationTime = formatTime(notification.createdAt)
  return (
    <div className='notification-item-container'>
      <div className='notification-item'>
        {notificationIcon()}
        <div className='notification-text-container'>
          <p className='notification-text'>{notificationText()}</p>
          <p className='notification-time'>{notificationTime}</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
