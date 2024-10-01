import './Container.css'

interface ContainerProps {
  children: React.ReactNode
  pageName?: string
}

const Container = ({ children, pageName }: ContainerProps) => {
  return (
    <div
      className='container'
      id={pageName}
    >
      {children}
    </div>
  )
}

export default Container
