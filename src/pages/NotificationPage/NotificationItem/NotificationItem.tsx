import './NotificationItem.css'
import Popular from '@assets/icons/notification_congratulation.svg?react'
import Comment from '@assets/icons/notification_comment.svg?react'
import Like from '@assets/icons/notification_like.svg?react'
import formatTime from '@/utils/formatTime'
import { useNavigate } from 'react-router-dom'
import { FormatNotification } from '@/typings/types'

interface NotificationItemProps {
  notification: FormatNotification
}

interface NotificationData {
  notificationIcon: JSX.Element
  notificationText: string
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const navigate = useNavigate()

  const setNotificationData = () : NotificationData => {
    if (notification.like !== undefined) {
      return {
        notificationIcon: <Like />,
        notificationText: `[${notification.postTitle}] 게시글에 좋아요가 달렸어요.`,
      }
    } else if (notification.comment !== undefined) {
      return {
        notificationIcon: <Comment />,
        notificationText: `[${notification.postTitle}] 게시글에 댓글이 달렸어요.`,
      }
    }
    return {
      notificationIcon: <Popular />,
      notificationText: `[${notification.postTitle}] 알림이 도착했습니다.`,
    }
  }

  const { notificationIcon, notificationText } = setNotificationData()
  const notificationTime = formatTime(notification.createdAt)

  const handleNotification = () => {
    // putNotification() //읽음처리
    navigate(`/post/${notification.post}`, { state: { from: '/notification' } })
  }
  return (
    <div className='notification-item-container'>
      <div
        className='notification-item'
        onClick={handleNotification}
      >
        {notificationIcon}
        <div className='notification-text-container'>
          <p className='notification-text'>{notificationText}</p>
          <p className='notification-time'>{notificationTime}</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
