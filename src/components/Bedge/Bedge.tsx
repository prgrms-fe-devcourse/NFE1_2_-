import './Bedge.css'

interface BedgeProps {
  type: 'mbti' | 'agree' | 'disagree' | 'best' | 'type'
  body: string
}

/**
 *
 * @param type : 벳지의 타입을 넘겨주세요
 * @param body : 벳지 안의 내용
 * @returns
 */

const Bedge = ({ type, body }: BedgeProps) => {
  return (
    <div
      className='bedge'
      id={type}
    >
      {body}
    </div>
  )
}

export default Bedge
