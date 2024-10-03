import axios from 'axios'
import { Like, Post, User } from '@/typings/types'
import formatPostData from './formatPostData'

const END_POINT = 'https://kdt.frontend.5th.programmers.co.kr:5001/'
export const USER_ID = import.meta.env.VITE_USER_ID
export const USER_TOKEN = import.meta.env.VITE_TOKEN

const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error('서버 통신 오류')
  } else {
    console.error(error)
    throw new Error('예기치 못한 오류')
  }
}

const RequestHeader = {
  headers: {
    Authorization: `bearer ${USER_TOKEN}`,
  },
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

export const updateUserPassword = async (newPassword: string) => {
  try {
    const response = await axios.put(
      `${END_POINT}settings/update-password`,
      {"password" : newPassword},
      RequestHeader,
    )
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

export const cancelLiked = async (likeId: string | undefined) => {
  if (!likeId) {
    return
  }

  try {
    const response = await axios.delete(`${END_POINT}likes/delete`, {
      data: {
        id: likeId,
      },
      ...RequestHeader,
    })

    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const postLiked = async (postId: string) => {
  if (!postId) {
    return
  }

  try {
    const response = await axios.post(
      `${END_POINT}likes/create`,
      { postId },
      RequestHeader,
    )
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}
interface LikeRequestData {
  userId?: string
  postId: string
}

export const getLikedData = async (
  isLiked: boolean | null,
  likeRequestData: LikeRequestData,
) => {
  const { userId, postId } = likeRequestData

  if (isLiked) {
    if (userId && postId) {
      const likedId = await getUserLikedData(userId, postId)
      await cancelLiked(likedId)
    }
  } else {
    await postLiked(postId)
  }
}

export const deletePost = async (postId: string) => {
  try {
    const response = await axios.delete(`${END_POINT}posts/delete`, {
      data: {
        id: postId,
      },
      ...RequestHeader,
    })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export interface RequestData {
  notificationType: 'COMMENT' | 'LIKE' | 'MESSAGE'
  notificationTypeId: string
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

export const postNotification = async (requestData: RequestData) => {
  try {
    const response = await axios.post(
      `${END_POINT}notifications/create`,
      requestData,
      RequestHeader,
    )

    return response.data
  } catch (error) {
    throw handleError(error)
  }
}
export interface PollData {
  user: string
  voted: 'agree' | 'disagree'
}

export const formatPostPollData = async (
  postId: string,
  pollData: PollData,
) => {
  if (pollData === null) {
    return undefined
  }
  const postData = await getPostData(postId)
  const formatData: Post = formatPostData(postData)
  const {
    title,
    image,
    channel: { _id },
  } = formatData

  const { poll } = title
  // 기존 투표 데이터를 가져오고, 사용자 투표 정보를 추가
  const { user, voted } = pollData
  const agree = voted === 'agree' ? [user] : []
  const disagree = voted === 'disagree' ? [user] : []

  // 현재 포스트 데이터의 poll 데이터와 사용자의 데이터를 합칩니다.
  const mergePoll = {
    title: poll.title,
    agree: [...poll.agree, ...agree],
    disagree: [...poll.disagree, ...disagree],
  }

  // poll 데이터를 포함한 title 값을 포맷해줍니다.
  const formatTitle = JSON.stringify({ ...title, poll: mergePoll })

  return { postId, title: formatTitle, image, channelId: _id }
}

export const postFormData = async (postId: string, pollData: PollData) => {
  const postPollData = await formatPostPollData(postId, pollData)
  if (!postPollData) {
    return
  }
  const postPollForm = new FormData()
  Object.entries(postPollData).forEach(([key, value]) => {
    postPollForm.append(key, value as string)
  })

  return postPollForm
}

const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN

export const postPoll = async (postId: string, pollData: PollData) => {
  const formData = await postFormData(postId, pollData)
  try {
    const response = await axios.put(`${END_POINT}posts/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${ADMIN_TOKEN}`,
      },
    })

    return response
  } catch (error) {
    throw handleError(error)
  }
}

export interface UserComment {
  comment: string
  postId: string
}

export const postComment = async (userComment: UserComment) => {
  try {
    const response = await axios.post(
      `${END_POINT}comments/create`,
      userComment,
      RequestHeader,
    )

    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axios.delete(`${END_POINT}comments/delete`, {
      data: {
        id: commentId,
      },
      ...RequestHeader,
    })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

//로그아웃 
getUserData(USER_ID).then((data) => console.log(data))

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('로그인 정보가 없습니다.')
    }

    const response = await axios.post(`${END_POINT}logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    localStorage.removeItem('token')
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

