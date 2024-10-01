import { useMutation, useQueryClient } from '@tanstack/react-query'

type MutationConfig<T> = {
  mutationFn: (data: T) => Promise<unknown>
  queryKey: string[]
  onSuccessCallback?: () => void
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      if (onSuccessCallback) {
        onSuccessCallback()
      }
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
