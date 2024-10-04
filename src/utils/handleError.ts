import { toast } from 'react-toastify'

const handleError = (error: Error) => {
  switch (error.message) {
    case '서버 통신 오류':
      toast.error('서버 통신 오류, 다시 시도해주세요.')
      break
    case '예기치 못한 오류':
      toast.error('예기치 못한 오류, 다시 시도해주세요.')
      break
    default:
      toast.error('알 수 없는 오류가 발생했습니다.') // 기본 에러 핸들링 추가
  }
}

export default handleError
