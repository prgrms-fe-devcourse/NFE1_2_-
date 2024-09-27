import TopNavigator from '@components/TopNavigator/TopNavigator'
import Container from '@components/Conatiner/Container'

const DetailPageLayout = ({
  children,
  pageText,
}: {
  children: JSX.Element
  pageText?: string
}) => {
  return (
    <Container>
      <TopNavigator pageText={pageText} />
      {children}
    </Container>
  )
}

export default DetailPageLayout
