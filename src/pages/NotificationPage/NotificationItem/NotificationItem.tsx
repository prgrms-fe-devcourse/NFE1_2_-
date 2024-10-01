import './NotificationItem.css'
import { Notification } from '@/typings/types'
import Popular from '@assets/icons/notification_congratulation.svg?react'
import Comment from '@assets/icons/notification_comment.svg?react'
import Like from '@assets/icons/notification_like.svg?react'
import formatTime from '@/utils/formatTime'
import { useCallback } from 'react'

interface NotificationItemProps {
  notification: Notification
}

interface NotificationData {
  notificationIcon: JSX.Element
  notificationText: string
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const setNotificationData = useCallback<() => NotificationData>(() => {
    if (notification.like !== undefined) {
      return {
        notificationIcon: <Like />,
        notificationText: `"왜만나는거야? 왜만나는거야?" 게시글에 좋아요가 달렸어요.`,
      }
    } else if (notification.comment !== undefined) {
      return {
        notificationIcon: <Comment />,
        notificationText: `"왜만나는거야? 왜만나는거야? 왜만나는거야? 왜만나는거야?"에 댓글이 달렸어요.`,
      }
    }
    return {
      notificationIcon: <Popular />,
      notificationText: `축하합니다! 회원님의 게시글이 인기글에 선정되었어요!`,
    }
  }, [])

  const { notificationIcon, notificationText } = setNotificationData()
  const notificationTime = formatTime(notification.createdAt)

  return (
    <div className='notification-item-container'>
      <div className='notification-item'>
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