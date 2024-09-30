import { User } from '@/typings/types'

const AfterPoll = ({
  agree,
  disagree,
}: {
  agree: User[]
  disagree: User[]
}) => {
  console.log(agree, disagree)
  return (
    <div className='poll-result-container'>
      <div className='poll-result-title'>
        <p>찬성</p>
        <p>반대</p>
      </div>
      <div className='poll-graph-container'>
        <div className='poll-grah agree'>
          <p>40%</p>
        </div>
        <div className='poll-grah disagree'>
          <p>60%</p>
        </div>
      </div>
    </div>
  )
}

export default AfterPoll
