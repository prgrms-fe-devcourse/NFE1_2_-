import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './NotificationPage.css'
import Navigator from '@/components/Navigatior/Navigator'
import NotificationContainer from './NotificationContainer/NotificationContainer'
import { Notification } from '@/typings/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import timeSeparation from '@/utils/timeSeparation'
import { getNotification, putNotification } from '@/utils/api'
import Loading from '../Loading/Loading'
import NotFound from '../NotFound/NotFound'

const NotificationPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotification(),
    // refetchInterval : 1000 //새로고침
  })
  const mutationFn = () => putNotification()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <NotFound />
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
      <div className='read-button-container'>
        <button
          className='read-button'
          onClick={() => mutate()}
        >
          읽음 처리
        </button>
      </div>
      {unreadNotifications && unreadNotifications.length > 0 && (
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
