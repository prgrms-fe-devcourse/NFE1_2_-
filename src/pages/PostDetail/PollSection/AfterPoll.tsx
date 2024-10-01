import { Poll } from '@/typings/types'

const AfterPoll = ({ poll }: { poll: Poll }) => {
  const formatGraphData = (poll: Poll) => {
    const { agree, disagree } = poll
    const totalVotes = agree.length + disagree.length

    const calculatePercentage = (count: number) =>
      totalVotes === 0 ? 0 : Math.floor((count / totalVotes) * 100)

    return {
      agreePercentage: calculatePercentage(agree.length),
      disagreePercentage: calculatePercentage(disagree.length),
    }
  }

  const { agreePercentage, disagreePercentage } = formatGraphData(poll)

  const renderGraph = (percentage: number, className: string) => (
    <div
      className={`poll-graph ${className}`}
      style={{
        width: `${percentage}%`,
        display: percentage === 0 ? 'none' : 'flex',
      }}
    >
      {percentage > 0 && <p>{percentage} %</p>}
    </div>
  )

  return (
    <div className='poll-result-container'>
      <div className='poll-result-title'>
        <p>찬성</p>
        <p>반대</p>
      </div>
      <div className='poll-graph-container'>
        {renderGraph(agreePercentage, 'agree')}
        {renderGraph(disagreePercentage, 'disagree')}
      </div>
    </div>
  )
}

export default AfterPoll
