import '../MyPage.css'

interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className='card'>
      <p className='title'>{title}</p>
      {children}
    </div>
  )
}

export default Section
