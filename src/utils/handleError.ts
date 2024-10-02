import { toast } from 'react-toastify'

const handleError = (error: Error) => {
  switch (error.message) {
    case '서버 통신 오류':
      toast.error('서버 통신 오류, 다시 시도해주세요.')
      break
    case '예기치 못한 오류':
      toast.error('예기치 못한 오류, 다시 시도해주세요.')
      break
  }
}

export default handleError
