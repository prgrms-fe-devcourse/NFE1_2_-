# Vote Solve
<img src="https://github.com/user-attachments/assets/21bdf19a-08a8-4b5e-84d8-f9354632fbbd" alt="VoteSolveLogo" width="100%">

- 프로그래머스 프론트엔드 데브코스 1기 2차 프로젝트 어? 금지팀 (1팀)
- 개발 기간 : 2024.09.12 ~ 24.10.07

<br>

## 프로젝트 소개

- **연애** 고민을 공유하고 **투표** 기반의 커뮤니티 **조언**을 받는 익명 온라인 플랫폼

- 다양한 연애 주제에 대한 토론과 경험 공유의 장을 제공

- 익명성에서 오는 모호함을 해소하기 위해 **MBTI**를 활용

<br>

## 팀원 구성

| 팀장 | 팀원 | 팀원 | 팀원 |
|:------:|:------:|:------:|:------:|
| ![이준희](https://avatars.githubusercontent.com/june960427?v=4) | ![김혜준](https://avatars.githubusercontent.com/hyejun-fe?v=4) | ![이은수](https://avatars.githubusercontent.com/eunjju2?v=4) | ![진채정](https://avatars.githubusercontent.com/ahcgnoej?v=4) |
| [이준희](https://github.com/june960427) | [김혜준](https://github.com/hyejun-fe) | [이은수](https://github.com/eunjju2) | [진채정](https://github.com/ahcgnoej) |

<br>

## 기술 스택

### Stacks
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)

### Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Collaboration
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

<br>

## 프로젝트 구조
```
📦node_modules
📦public
📦src
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┣ 📂icons
 ┃ ┗ 📂imgs
 ┣ 📂components
 ┃ ┣ 📂Bedge
 ┃ ┣ 📂BottomModal
 ┃ ┣ 📂Conatiner
 ┃ ┣ 📂MbtiSelector
 ┃ ┣ 📂Navigatior
 ┃ ┣ 📂PostComponent
 ┃ ┣ 📂PostPageButton
 ┃ ┗ 📂TopNavigator
 ┣ 📂hooks
 ┣ 📂layouts
 ┃ ┣ 📂DetailPageLayout
 ┃ ┗ 📂MainPageLayout
 ┣ 📂pages
 ┃ ┣ 📂JoinCompletePage
 ┃ ┣ 📂JoinPage
 ┃ ┣ 📂Loading
 ┃ ┣ 📂LoginPage
 ┃ ┣ 📂MyPage
 ┃ ┣ 📂NotFound
 ┃ ┣ 📂NotificationPage
 ┃ ┣ 📂PostCreate
 ┃ ┣ 📂PostDetail
 ┃ ┣ 📂PostList
 ┃ ┣ 📂SplashScreen
 ┣ 📂store
 ┣ 📂typings
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
📜.gitignore
📜.prettierrc
📜eslint.config.js
📜index.html
📜package-lock.json
📜package.json
📜README.md
📜tsconfig.json
📜vite.config.ts
```

<br>

## 주요 기능

| 프로필 설정 | 기능 |
|-------------|------------|
| ![VoteSolveLogo](https://github.com/user-attachments/assets/21bdf19a-08a8-4b5e-84d8-f9354632fbbd) | 회원가입 시 성별, 연령대 설정을 위한 생년월일, 그리고 MBTI를 입력받습니다. 추후 프로필 정보를 수정할 수 있습니다. |

| 포스트 목록 | 기능 |
|-------------|------------|
| ![VoteSolveLogo](https://github.com/user-attachments/assets/21bdf19a-08a8-4b5e-84d8-f9354632fbbd) | 모든 사용자는 전체보기 / 카테고리 별 / 내글 모아보기 / 인기순 / 최신순으로 정렬하여 포스트를 확인할 수 있습니다. |

| 검색 기능 | 기능 |
|-------------|------------|
| ![VoteSolveLogo](https://github.com/user-attachments/assets/21bdf19a-08a8-4b5e-84d8-f9354632fbbd) | 포스트 제목 또는 MBTI를 검색하여 포스트 목록을 필터링할 수 있습니다. |

| 카테고리별 질문 추천 | 기능 |
|-------------|------|
| ![VoteSolveLogo](https://github.com/user-attachments/assets/21bdf19a-08a8-4b5e-84d8-f9354632fbbd) | 서비스에 가입한 사용자는 포스트를 작성할 수 있습니다. 포스트 작성 시 카테고리를 선택하면, 해당 카테고리에 맞는 투표 질문이 자동으로 추천됩니다. 또한 질문을 직접 작성할 수 있습니다. |

| 투표 기능 및 댓글 블러 처리 | 기능 |
|-------------|------|
| ![VoteSolveLogo](https://github.com/user-attachments/assets/21bdf19a-08a8-4b5e-84d8-f9354632fbbd) | 사용자는 다른 사용자의 포스트에 찬성 또는 반대 투표를 할 수 있으며, 투표를 완료해야 댓글을 볼 수 있도록 댓글이 블러 처리됩니다. |

| 알림 | 기능 |
|-------------|------|
| ![VoteSolveLogo](https://github.com/user-attachments/assets/21bdf19a-08a8-4b5e-84d8-f9354632fbbd) | 내 게시물에 다른 사용자가 좋아요를 누르거나 댓글을 달면 알림을 받습니다. |



