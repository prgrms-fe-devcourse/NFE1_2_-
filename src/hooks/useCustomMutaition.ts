import { useMutation, useQueryClient } from '@tanstack/react-query'

type MutationConfig<T> = {
  mutationFn: (data?: T) => Promise<unknown>
  queryKey: string[]
  onSuccessCallback?: (data?: T) => Promise<unknown>
  onErrorCallback?: () => void
}

const useCustomMutation = <T>({
  mutationFn,
  queryKey,
  onSuccessCallback,
  onErrorCallback,
}: MutationConfig<T>) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey })
      if (onSuccessCallback) {
        onSuccessCallback(data)
      }
      return data
    },
    onError: (error) => {
      if (onErrorCallback) {
        onErrorCallback()
      } else {
        console.error('에러 발생', error)
      }
    },
  })
}

export default useCustomMutation
