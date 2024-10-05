import axios from 'axios'
import { FormattedPost, Post, User, Notification } from '@/typings/types'
import formatPostData from './formatPostData'

const END_POINT = 'https://kdt.frontend.5th.programmers.co.kr:5001/'
export const USER_ID = localStorage.getItem('userId')
export const USER_TOKEN = localStorage.getItem('token')

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

export const updateUserData = async (fullname: string): Promise<void> => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `${END_POINT}settings/update-user`,
      { fullName: fullname, username: 'false' },
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

export const updateUserPassword = async (
  newPassword: string,
): Promise<void> => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `${END_POINT}settings/update-password`,
      { password: newPassword },
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

export const cancelLiked = async (likeId: string) => {
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
  const formatData: FormattedPost = formatPostData(postData)
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
  _id?: string
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

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('로그인 정보가 없습니다.')
    }

    const response = await axios.post(
      `${END_POINT}logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getAuthUser = async (): Promise<User> => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${END_POINT}auth-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const createPost = async (newPost: FormData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      'https://kdt.frontend.5th.programmers.co.kr:5001/posts/create',
      newPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('포스트 생성 오류:', error)
    throw error
  }
}

export const editPost = async (newPost: FormData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      'https://kdt.frontend.5th.programmers.co.kr:5001/posts/update',
      newPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('포스트 생성 오류:', error)
    throw error
  }
}

export const getNotification = async (): Promise<Notification[]> => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get<Notification[]>(
      'https://kdt.frontend.5th.programmers.co.kr:5001/notifications',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('알림 가져오기 오류:', error)
    throw error
  }
}

export const putNotification = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put<Notification[]>(
      'https://kdt.frontend.5th.programmers.co.kr:5001/notifications/seen',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('알림 보기 오류:', error)
    throw error
  }
}

export interface UpdatePost {
  postId: string
  title: string
  image: string | null
  imageToDeletePublicId?: string
  channelId: string
}

export const formatFormData = (formData: UpdatePost) => {
  const postFormData = new FormData()
  Object.entries(formData).forEach(([key, value]) => {
    postFormData.append(key, value as string)
  })

  return postFormData
}

export const updatePost = async (formData: FormData) => {
  try {
    const response = await axios.put(`${END_POINT}posts/update`, formData, {
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getMyPostList = async () => {
  try {
    const response = await axios.get(`${END_POINT}posts/author/${USER_ID}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}
