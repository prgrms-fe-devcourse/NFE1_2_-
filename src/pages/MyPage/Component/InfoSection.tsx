import '../MyPage.css'

interface SectionProps {
  title: string
  children: React.ReactNode
}

const InfoSection: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className='info-card'>
      <p className='info-title'>{title}</p>
      {children}
    </div>
  )
}

export default InfoSection
