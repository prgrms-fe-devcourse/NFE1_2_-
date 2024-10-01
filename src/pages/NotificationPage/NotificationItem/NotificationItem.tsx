import './NotificationItem.css'
import { Notification } from '@/typings/types'
import Popular from '@assets/icons/notification_congratulation.svg?react'
import Comment from '@assets/icons/notification_comment.svg?react'
import Like from '@assets/icons/notification_like.svg?react'
import formatTime from '@/utils/formatTime'
import { useCallback, useEffect, useState } from 'react'
import { getPostData } from '@/utils/api'
import { parseIfString } from '@/utils/formatPostData'

interface NotificationItemProps {
  notification: Notification
}

interface NotificationData {
  notificationIcon: JSX.Element
  notificationText: string
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const [postTitle, setPostTitle] = useState<string>('')
  const getPostTitle = async (notification: Notification) => {
    if (notification.post) {
      const post = await getPostData(notification.post)
      setPostTitle(parseIfString(post.title).title)
    }
  }
  useEffect(() => {
    getPostTitle(notification)
  }, [notification])

  const setNotificationData = useCallback<() => NotificationData>(() => {
    if (notification.like !== undefined) {
      return {
        notificationIcon: <Like />,
        notificationText: `"${postTitle}" 게시글에 좋아요가 달렸어요.`,
      }
    } else if (notification.comment !== undefined) {
      return {
        notificationIcon: <Comment />,
        notificationText: `"${postTitle}"에 댓글이 달렸어요.`,
      }
    }
    return {
      notificationIcon: <Popular />,
      notificationText: `축하합니다! 회원님의 게시글 "${postTitle}"이 인기글에 선정되었어요!`,
    }
  }, [notification, postTitle])

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
