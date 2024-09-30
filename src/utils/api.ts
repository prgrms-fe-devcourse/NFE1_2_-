import axios from 'axios'
import { Like, Poll, Post, PostDetail, User } from '@/typings/types'
import formatPostData from './formatPostData'
import { data } from '@remix-run/router/dist/utils'

const END_POINT = 'https://kdt.frontend.5th.programmers.co.kr:5001/'
export const USER_ID = import.meta.env.VITE_USER_ID
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

export const getUserData = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`${END_POINT}users/${userId}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getUserLikedData = async (
  userId: string,
  postId: string,
): Promise<string | undefined> => {
  const { likes }: { likes: Like[] } = await getUserData(userId)
  return likes.find((like) => like.post === postId)?._id
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
interface LikeRequestData {
  userId?: string
  postId: string
  token: string
}

export const getLikedData = async (
  isLiked: boolean | null,
  likeRequestData: LikeRequestData,
) => {
  const { token, userId, postId } = likeRequestData

  if (isLiked) {
    if (userId && postId) {
      const likedId = await getUserLikedData(userId, postId)
      await cancelLiked(likedId, token)
    }
  } else {
    await postLiked(postId, token)
  }
}

export const deletePost = async (postId: string, token: string) => {
  try {
    const response = await axios.delete(`${END_POINT}posts/delete`, {
      data: {
        id: postId,
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

export interface RequestData {
  notificationType: 'COMMENT' | 'LIKE' | 'MESSAGE'
  userId: string
  postId: string
}

export const getIdByRequestType = async (
  userId: string,
  notificationType: string,
  postId: string,
) => {
  const userData = await getUserData(userId)
  if (userData) {
    switch (notificationType) {
      case 'LIKE':
        return userData.likes?.find(({ post }) => post === postId)?._id
      case 'COMMENT':
        return userData.likes?.find((like) => like.post === postId)?._id
    }
  }
}

export const notificationData = async (requestData: RequestData) => {
  const { notificationType, postId, userId } = requestData
  const notificationTypeId = await getIdByRequestType(
    userId,
    notificationType,
    postId,
  )
  if (notificationTypeId != undefined) {
    return { notificationType, postId, userId, notificationTypeId }
  }
}

export const postNotification = async (
  requestData: RequestData,
  token: string,
) => {
  try {
    const response = await axios.post(
      `${END_POINT}notifications/create`,
      await notificationData(requestData),
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const formatPostPollData = async (postId: string, pollData: Poll) => {
  const postData = await getPostData(postId)
  const formatData: Post = formatPostData(postData)
  const {
    title,
    image,
    channel: { _id },
  } = formatData
  const { poll } = title

  const { agree, disagree } = pollData
  const formatPoll = {
    title: poll.title,
    agree: [...poll.agree, ...agree],
    disagree: [...poll.disagree, ...disagree],
  }
  const formatTitle = JSON.stringify({ ...title, poll: formatPoll })

  return { postId, title: formatTitle, image, channelId: _id }
}

export const postPoll = async (postId: string, pollData: Poll) => {
  const postPollData = await formatPostPollData(postId, pollData)
  const postPollForm = new FormData()

  Object.entries(postPollData).forEach(([key, value]) => {
    postPollForm.append(key, value)
  })

  return postPollData
}
