import './NotificationContainer.css'
import NotificationItem from '../NotificationItem/NotificationItem'
import { Notification } from '@/typings/types'

interface NotificationProps {
  period: string
  notifications: Notification[]
}

const NotificationContainer = (props: NotificationProps) => {
  const { period, notifications } = props
  return (
    <div className='notification-container'>
      <p className='period-name'>{period}</p>
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          notification={notification}
        />
      ))}
      <div className='container-line' />
    </div>
  )
}
export default NotificationContainer
