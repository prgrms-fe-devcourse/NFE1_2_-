import { Poll } from '@/typings/types'

const AfterPoll = ({ poll }: { poll: Poll }) => {
  const formatGraphData = (poll: Poll) => {
    const { agree, disagree } = poll
    const agreeVoteLength = agree.length
    const disagreeVoteLength = disagree.length
    const totalVotes = agreeVoteLength + disagreeVoteLength

    const agreePercentage =
      totalVotes === 0 ? 0 : Math.floor((agreeVoteLength / totalVotes) * 100)

    const disagreePercentage =
      totalVotes === 0 ? 0 : Math.floor((disagreeVoteLength / totalVotes) * 100)

    return { agreePercentage, disagreePercentage }
  }

  const { agreePercentage, disagreePercentage } = formatGraphData(poll)

  return (
    <div className='poll-result-container'>
      <div className='poll-result-title'>
        <p>찬성</p>
        <p>반대</p>
      </div>
      <div className='poll-graph-container'>
        <div
          className='poll-grah agree'
          style={{
            width: `${agreePercentage}%`,
            display: agreePercentage === 0 ? 'none' : '',
          }}
        >
          <p>{agreePercentage} %</p>
        </div>
        <div
          className='poll-grah disagree'
          style={{
            width: `${disagreePercentage}%`,
            display: disagreePercentage === 0 ? 'none' : '',
          }}
        >
          {disagreePercentage === 0 ? null : <p>{disagreePercentage} %</p>}
        </div>
      </div>
    </div>
  )
}

export default AfterPoll
