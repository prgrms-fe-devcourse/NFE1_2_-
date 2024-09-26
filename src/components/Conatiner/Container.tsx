import './Container.css'

const Container = ({ children }: { children: JSX.Element[] }) => {
  console.log(children)
  return <div className='container'>{children}</div>
}

export default Container
