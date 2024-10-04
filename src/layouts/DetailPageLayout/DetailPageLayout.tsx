import TopNavigator from '@components/TopNavigator/TopNavigator'
import Container from '@components/Conatiner/Container'

interface DetailPageLayoutProps {
  children: React.ReactNode
  pageText?: string
  pageName?: string
  newPath? : boolean
}

const DetailPageLayout = ({
  children,
  pageText,
  pageName,
  newPath
}: DetailPageLayoutProps) => {
  return (
    <Container pageName={pageName}>
      <TopNavigator pageText={pageText} newPath={newPath} />
      {children}
    </Container>
  )
}

export default DetailPageLayout
