import { useMutation, useQueryClient } from '@tanstack/react-query'

type MutationConfig<T, E = unknown> = {
  mutationFn: (data: T) => Promise<T>
  queryKey: string[]
  onSuccessCallback?: (data: T) => Promise<unknown> | void
  onErrorCallback?: (error: E) => void
}

const useCustomMutation = <T, E = unknown>({
  mutationFn,
  queryKey,
  onSuccessCallback,
  onErrorCallback,
}: MutationConfig<T, E>) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: async (data: T) => {
      queryClient.invalidateQueries({ queryKey })
      if (onSuccessCallback) {
        await onSuccessCallback(data) // Promise 처리
      }
      return data
    },
    onError: (error: E) => {
      if (onErrorCallback) {
        onErrorCallback(error) // 오류를 callback에 전달
      } else {
        console.error('에러 발생', error)
      }
    },
  })
}

export default useCustomMutation
