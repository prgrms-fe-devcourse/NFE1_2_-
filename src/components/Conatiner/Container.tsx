import './Container.css'

const Container = ({ children }: { children: JSX.Element[] }) => {
  return <div className='container'>{children}</div>
}

export default Container
