import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './NotificationPage.css'
import Navigator from '@/components/Navigatior/Navigator'
import NotificationContainer from './NotificationContainer/NotificationContainer'
import { Notification } from '@/typings/types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const getNotification = async (): Promise<Notification[]> => {
  const token =
    '' //localStorage에서 가져오도록 추후 수정
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

  console.log(data)
  const unreadNotifications = data?.filter(
    (notification) => notification.seen === false
  )

  console.log(unreadNotifications)
  return (
    <DetailPageLayout
      pageName='notification'
      pageText='알림'
    >
      <NotificationContainer period='읽지 않음' />
      <NotificationContainer period='어제' />
      <NotificationContainer period='최근 7일' />
      <NotificationContainer period='이전 활동' />
      <Navigator />
    </DetailPageLayout>
  )
}

export default NotificationPage
