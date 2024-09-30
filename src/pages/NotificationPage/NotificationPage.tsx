import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './NotificationPage.css'
import Navigator from '@/components/Navigatior/Navigator'
import NotificationContainer from './NotificationContainer/NotificationContainer'
import { Notification } from '@/typings/types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import timeSeparation from '@/utils/timeSeparation'

const getNotification = async (): Promise<Notification[]> => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZjkwMWNjMzYyN2UzNTYzZTMyNzIyNCIsImVtYWlsIjoibGVlQGdtYWlsLmNvbSJ9LCJpYXQiOjE3Mjc1OTQ5NTZ9.2dbp6G3LSvdVMCUCDRscDfmPJTjrsQiPgONM7AmQ7eA' //localStorage에서 가져오도록 추후 수정
  try {
    const response = await axios.get<Notification[]>(
      'https://kdt.frontend.5th.programmers.co.kr:5001/notifications',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('알림 가져오기 오류:', error)
    throw error
  }
}

const NotificationPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotification,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const unreadNotifications: Notification[] = []
  const todayNotifications: Notification[] = []
  const yesterdayNotifications: Notification[] = []
  const weekNotifications: Notification[] = []
  const pastNotifications: Notification[] = []

  data?.forEach((notification) => {
    const timeNotification = timeSeparation(notification.createdAt)

    if (!notification.seen) {
      unreadNotifications?.push(notification)
    } else if (timeNotification === 'TODAY') {
      todayNotifications?.push(notification)
    } else if (timeNotification === 'YESTERDAY') {
      yesterdayNotifications?.push(notification)
    } else if (timeNotification === 'WEEK') {
      weekNotifications?.push(notification)
    } else if (timeNotification === 'PAST') {
      pastNotifications?.push(notification)
    }
  })

  return (
    <DetailPageLayout
      pageName='notification'
      pageText='알림'
    >
      {unreadNotifications && unreadNotifications.length > 1 && (
        <NotificationContainer
          period='읽지 않음'
          notifications={unreadNotifications}
        />
      )}
      {todayNotifications.length > 0 && (
        <NotificationContainer
          period='오늘'
          notifications={todayNotifications}
        />
      )}
      {yesterdayNotifications.length > 0 && (
        <NotificationContainer
          period='어제'
          notifications={yesterdayNotifications}
        />
      )}
      {weekNotifications.length > 0 && (
        <NotificationContainer
          period='최근 7일'
          notifications={weekNotifications}
        />
      )}
      {pastNotifications.length > 0 && (
        <NotificationContainer
          period='이전 활동'
          notifications={pastNotifications}
        />
      )}
      <Navigator />
    </DetailPageLayout>
  )
}

export default NotificationPage
