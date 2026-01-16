
# 커플 대시보드 (Couple Dashboard) 💖

재훈 ❤️ 도영 커플을 위한 개인화된 대시보드 웹앱입니다.

## 🚀 주요 기능

- **실시간 헤더**: 커플 이름과 함께 현재 날짜 및 시간을 실시간으로 표시합니다.
- **기념일 카운터 (D-Day)**: 중요한 날짜를 등록하고 D-Day(D+, D-)를 자동으로 계산합니다. 이모지 설정이 가능합니다.
- **공유 일정**: 다가오는 일정을 리스트 형태로 관리합니다. 날짜순으로 자동 정렬됩니다.
- **자동저장 메모장**: 함께 공유할 메모를 작성할 수 있으며, 입력 후 1초 뒤 자동으로 저장됩니다 (Debounce 적용).

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Persistence**: LocalStorage (브라우저 종료 후에도 데이터 유지)

## 🎨 디자인 컨셉

- **Rose/Pink Theme**: 사랑스러운 분위기를 위해 로즈 톤의 색감과 부드러운 애니메이션을 적용했습니다.
- **Responsive Design**: 모바일에서는 1열, 데스크톱에서는 2열 그리드로 최적화된 뷰를 제공합니다.
- **Card UI**: 깔끔한 카드 형태의 레이아웃과 그림자 효과를 사용했습니다.

## 📦 설치 및 실행

1. 의존성 설치:

```bash
npm install
```

1. 개발 서버 실행:

```bash
npm run dev
```

1. 브라우저에서 `http://localhost:3000` 접속

## 📂 프로젝트 구조

- `app/`: 메인 페이지 및 레이아웃
- `components/`: D-Day, 일정, 메모 등 개별 컴포넌트
- `lib/`: LocalStorage 관리 및 데이터 타입 정의
- `public/`: 정적 파일
