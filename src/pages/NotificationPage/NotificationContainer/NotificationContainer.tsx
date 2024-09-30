import './NotificationContainer.css'
import NotificationItem from '../NotificationItem/NotificationItem'
const NotificationContainer = ({period} : {period : string}) => {
  return (
    <div className='notification-container'>
      <p className='period-name'>{period}</p>
      <NotificationItem />
      <NotificationItem />
      <div className='container-line' />
    </div>
  )
}
export default NotificationContainer