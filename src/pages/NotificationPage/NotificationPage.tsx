import DetailPageLayout from '@/layouts/DetailPageLayout/DetailPageLayout'
import './NotificationPage.css'
import Navigator from '@/components/Navigatior/Navigator'
import NotificationContainer from './NotificationContainer/NotificationContainer'

const NotificationPage = () => {
  return (
    <DetailPageLayout pageName='notification' pageText='알림'>
      <NotificationContainer period='읽지 않음'/>
      <NotificationContainer period='어제'/>
      <NotificationContainer period='최근 7일'/>
      <NotificationContainer period='이전 활동'/>
      <Navigator />
    </DetailPageLayout>
  )
}

export default NotificationPage
