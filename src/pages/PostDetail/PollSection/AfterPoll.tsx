const AfterPoll = () => {
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
