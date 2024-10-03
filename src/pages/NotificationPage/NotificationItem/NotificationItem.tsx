import './NotificationItem.css'
import { Notification } from '@/typings/types'
import Popular from '@assets/icons/notification_congratulation.svg?react'
import Comment from '@assets/icons/notification_comment.svg?react'
import Like from '@assets/icons/notification_like.svg?react'
import formatTime from '@/utils/formatTime'
import { useCallback, useEffect, useState } from 'react'
import { getPostData } from '@/utils/api'
import { parseIfString } from '@/utils/formatPostData'
import axios from 'axios'

interface NotificationItemProps {
  notification: Notification
}

interface NotificationData {
  notificationIcon: JSX.Element
  notificationText: string
}

const putNotification = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZjkwMWNjMzYyN2UzNTYzZTMyNzIyNCIsImVtYWlsIjoibGVlQGdtYWlsLmNvbSJ9LCJpYXQiOjE3Mjc1OTQ5NTZ9.2dbp6G3LSvdVMCUCDRscDfmPJTjrsQiPgONM7AmQ7eA' //localStorage에서 가져오도록 추후 수정
  try {
    const response = await axios.put<Notification[]>(
      'https://kdt.frontend.5th.programmers.co.kr:5001/notifications/seen',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('읽기 완료')
    return response.data
  } catch (error) {
    console.error('알림 보기 오류:', error)
    throw error
  }
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
        notificationText: `[${postTitle}] 게시글에 좋아요가 달렸어요.`,
      }
    } else if (notification.comment !== undefined) {
      return {
        notificationIcon: <Comment />,
        notificationText: `[${postTitle}] 게시글에 댓글이 달렸어요.`,
      }
    }
    return {
      notificationIcon: <Popular />,
      notificationText: `축하합니다! 회원님의 게시글 [${postTitle}]이 인기글에 선정되었어요!`,
    }
  }, [notification, postTitle])

  const { notificationIcon, notificationText } = setNotificationData()
  const notificationTime = formatTime(notification.createdAt)

  const handleNotification = () => {
    putNotification()
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