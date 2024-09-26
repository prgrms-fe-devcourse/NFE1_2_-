import AgreeOptionImg from '@assets/imgs/agree.png'
import DisAgreeOptionImg from '@assets/imgs/disagree.png'

const BeforePoll = () => {
  return (
    <div className='poll-option-container'>
      <div className='poll-option'>
        <p>찬성</p>
        <button className='poll-button'>
          <img
            src={AgreeOptionImg}
            alt='찬성 이미지'
          />
        </button>
      </div>
      <div className='poll-option'>
        <p>반대</p>
        <button className='poll-button'>
          <img
            src={DisAgreeOptionImg}
            alt='반대 이미지'
          />
        </button>
      </div>
    </div>
  )
}

export default BeforePoll
