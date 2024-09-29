import axios from 'axios'
import { Like, Post } from '@/typings/types'

const END_POINT = 'https://kdt.frontend.5th.programmers.co.kr:5001/'

const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error('서버 통신 오류')
  } else {
    console.error(error)
    throw new Error('예기치 못한 오류')
  }
}

export const getPostData = async (postId: string): Promise<Post> => {
  try {
    const response = await axios.get(`${END_POINT}posts/${postId}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

interface UsingData {
  userId?: string
  postId: string
  token: string
}

export const getUserLikedData = async (
  userId: string,
  postId: string,
): Promise<string | undefined> => {
  try {
    const response = await axios.get(`${END_POINT}users/${userId}`)
    const { likes }: { likes: Like[] } = await response.data
    return likes.find((like) => like.post === postId)?._id
  } catch (error) {
    throw handleError(error)
  }
}

export const cancelLiked = async (
  likeId: string | undefined,
  token: string,
) => {
  if (!likeId || !token) {
    return
  }

  try {
    const response = await axios.delete(`${END_POINT}likes/delete`, {
      data: {
        id: likeId,
      },
      headers: {
        Authorization: `bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const postLiked = async (postId: string, token: string) => {
  if (!postId || !token) {
    return
  }

  try {
    const response = await axios.post(
      `${END_POINT}likes/create`,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getLikedData = async (
  isLiked: boolean | null,
  usingData: UsingData,
) => {
  const { token, userId, postId } = usingData

  if (isLiked) {
    if (userId && postId) {
      const likedId = await getUserLikedData(userId, postId)
      await cancelLiked(likedId, token)
    } else {
      console.error('userId or postId is missing.')
    }
  } else {
    await postLiked(postId, token)
  }
}
