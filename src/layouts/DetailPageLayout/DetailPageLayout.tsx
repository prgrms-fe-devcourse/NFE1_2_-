import TopNavigator from '@components/TopNavigator/TopNavigator'
import Container from '@components/Conatiner/Container'

interface DetailPageLayoutProps {
  children: React.ReactNode
  pageText?: string
  pageName?: string
}

const DetailPageLayout = ({
  children,
  pageText,
  pageName,
}: DetailPageLayoutProps) => {
  return (
    <Container pageName={pageName}>
      <TopNavigator pageText={pageText} />
      {children}
    </Container>
  )
}

export default DetailPageLayout
