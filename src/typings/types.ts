// User 모델
export interface User {
  coverImage?: string // 커버 이미지 (선택적)
  image?: string // 프로필 이미지 (선택적)
  role: string
  emailVerified?: boolean // 사용되지 않음
  banned?: boolean // 사용되지 않음
  isOnline: boolean
  posts: Post[]
  likes: Like[]
  comments: Comment[]
  followers: User[]
  following: Following[]
  notifications: Notification[]
  messages: Message[]
  _id: string
  fullName: string | UserDetailData
  email: string
  createdAt: string
  updatedAt: string
}

// Following 모델
export interface Following {
  _id: string
  user: string // 사용자 id
  follower: string // 팔로워 id
  createdAt: string
  updatedAt: string
  __v: number
}

// Channel 모델
export interface Channel {
  authRequired?: boolean // 사용되지 않음
  posts: string[]
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

// 투표 탬플릿
export interface Poll {
  title: string // 투표 타이틀
  agree: string[] // 찬성 배열
  disagree: string[] // 반대 배열
}

// Post의 타이틀에 들어있는 데이터 베이스
export interface PostDetail {
  type: '이별' | '짝사랑' | '썸' | '데이트' | '기타' //게시글 타입
  title: string // 포스트 타이틀
  body: string // 포스트 글
  checkCount: number // 게시글 확인 인원수
  poll: Poll // 투표 탬플릿
}

// Post 모델
export interface Post {
  likes: Like[]
  comments: Comment[]
  _id: string
  image?: string // 선택적
  imagePublicId?: string // 선택적
  title: PostDetail
  channel: Channel
  author: User
  createdAt: string
  updatedAt: string
}

// Like 모델
export interface Like {
  _id: string
  user: string // 사용자 id
  post: string // 포스트 id
  createdAt: string
  updatedAt: string
}

// Comment 모델
export interface Comment {
  _id: string
  comment: string | CommentDetail
  author: User
  post: string // 포스트 id
  createdAt: string
  updatedAt: string
}

// commnet 데이터 베이스에 들어갈 데이터베이스
export interface CommentDetail {
  comment: string // 댓글 내용
  like: number // 해당 댓글 LIKE
  parentId?: string // 대댓글 작성시 parentId값 넣어서 POST (옵셔널)
}

// Notification 모델
export interface Notification {
  seen: boolean
  _id: string
  author: User
  user: User | string
  post?: string | null // 포스트 id (nullable)
  follow?: string // 팔로우 id (선택적)
  comment?: Comment // 선택적
  message?: string // 메시지 id (선택적)
  createdAt: string
  updatedAt: string
}

// Message 모델
export interface Message {
  _id: string
  message: string
  sender: User
  receiver: User
  seen: boolean
  createdAt: string
  updatedAt: string
}

export interface Token {
  token: string
}

export interface ResponseData {
  user: User
  token: Token
}

// 기본 유저 데이터
export interface UserDetailData {
  gender: string
  ageGroup: string
  mbti: string
}
