import './Bedge.css'

interface Bedge {
  type: 'mbti' | 'agree' | 'disagree' | 'best' | 'type'
  body: string
}

/**
 *
 * @param type : 벳지의 타입을 넘겨주세요
 * @param body : 벳지 안의 내용
 * @param onClick : 이벤트
 *
 * @returns
 */

const Bedge = ({ type, body }: Bedge) => {
  return (
    <button
      className='bedge'
      id={type}
    >
      {body}
    </button>
  )
}

export default Bedge
