import Container from '@components/Conatiner/Container'
import Navigator from '@components/Navigatior/Navigator'

const MainPageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Container>
      {children}
      <Navigator />
    </Container>
  )
}

export default MainPageLayout
