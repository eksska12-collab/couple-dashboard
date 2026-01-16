export interface DateCourse {
    name: string;
    category: "카페" | "맛집" | "문화생활" | "액티비티" | "쇼핑";
    budget: "₩" | "₩₩" | "₩₩₩";
    type: "indoor" | "outdoor";
    description: string;
    recommendedTime: "점심" | "저녁" | "밤";
    transport: "도보" | "대중교통" | "차량";
}

export const dateCourses: DateCourse[] = [
    // 실내 (Indoor) - 20개
    { name: "성수 LCDC 서울", category: "쇼핑", budget: "₩₩", type: "indoor", description: "복합문화공간 구경하기", recommendedTime: "점심", transport: "대중교통" },
    { name: "코엑스 별마당 도서관", category: "문화생활", budget: "₩", type: "indoor", description: "거대한 서가 앞에서 인증샷", recommendedTime: "저녁", transport: "대중교통" },
    { name: "잠실 아쿠아리움", category: "액티비티", budget: "₩₩₩", type: "indoor", description: "신비로운 바다 속 구경", recommendedTime: "점심", transport: "차량" },
    { name: "DDP 전시관", category: "문화생활", budget: "₩₩", type: "indoor", description: "현대적인 디자인 전시 관람", recommendedTime: "점심", transport: "대중교통" },
    { name: "더현대 서울", category: "쇼핑", budget: "₩₩₩", type: "indoor", description: "실내 정원과 쇼핑 즐기기", recommendedTime: "점심", transport: "대중교통" },
    { name: "국립중앙박물관", category: "문화생활", budget: "₩", type: "indoor", description: "조용하고 고즈넉한 데이트", recommendedTime: "점심", transport: "차량" },
    { name: "홍대 보드게임 카페", category: "액티비티", budget: "₩", type: "indoor", description: "승부욕 넘치는 게임 시간", recommendedTime: "저녁", transport: "도보" },
    { name: "강남 리얼샷 사격장", category: "액티비티", budget: "₩₩", type: "indoor", description: "스트레스 풀리는 사격 체험", recommendedTime: "저녁", transport: "대중교통" },
    { name: "한남동 구슬모아당구장", category: "문화생활", budget: "₩", type: "indoor", description: "트렌디한 전시와 굿즈", recommendedTime: "점심", transport: "대중교통" },
    { name: "망원동 소품샵 투어", category: "쇼핑", budget: "₩₩", type: "indoor", description: "귀여운 소품 가득한 골목", recommendedTime: "점심", transport: "도보" },
    { name: "용산 아이파크몰", category: "쇼핑", budget: "₩₩", type: "indoor", description: "영화보고 맛집 탐방까지", recommendedTime: "저녁", transport: "차량" },
    { name: "익선동 만화의 거리", category: "문화생활", budget: "₩", type: "indoor", description: "레트로 감성 만화책 읽기", recommendedTime: "점심", transport: "도보" },
    { name: "성수동 원데이 클래스", category: "액티비티", budget: "₩₩₩", type: "indoor", description: "나만의 향수/도자기 만들기", recommendedTime: "점심", transport: "대중교통" },
    { name: "압구정 갤러리 투어", category: "문화생활", budget: "₩", type: "indoor", description: "현대 미술 작품 감상하기", recommendedTime: "점심", transport: "차량" },
    { name: "연남동 독립서점", category: "문화생활", budget: "₩", type: "indoor", description: "서로에게 어울리는 책 선물", recommendedTime: "저녁", transport: "도보" },
    { name: "광화문 교보문고", category: "쇼핑", budget: "₩", type: "indoor", description: "대형 서점 데이트의 정석", recommendedTime: "점심", transport: "대중교통" },
    { name: "잠실 롯데월드몰 시네마", category: "문화생활", budget: "₩₩", type: "indoor", description: "최신 영화 편하게 관람", recommendedTime: "밤", transport: "차량" },
    { name: "서촌 베어카페", category: "카페", budget: "₩₩", type: "indoor", description: "한옥 마당이 예쁜 서점 카페", recommendedTime: "점심", transport: "도보" },
    { name: "성수 메가박스 돌비", category: "문화생활", budget: "₩₩", type: "indoor", description: "압도적인 사운드로 영화 감상", recommendedTime: "밤", transport: "대중교통" },
    { name: "을지로 도심 속 만화카페", category: "문화생활", budget: "₩", type: "indoor", description: "힙지로 느낌 가득한 아지트", recommendedTime: "저녁", transport: "도보" },

    // 야외 (Outdoor) - 20개
    { name: "성수동 연무장길", category: "카페", budget: "₩₩", type: "outdoor", description: "힙한 팝업스토어 탐방", recommendedTime: "점심", transport: "도보" },
    { name: "연남동 연트럴파크", category: "액티비티", budget: "₩", type: "outdoor", description: "돗자리 펴고 피크닉 즐기기", recommendedTime: "저녁", transport: "대중교통" },
    { name: "이태원 경리단길", category: "맛집", budget: "₩₩", type: "outdoor", description: "남산 타워 뷰 맛집 투어", recommendedTime: "저녁", transport: "대중교통" },
    { name: "경복궁 야간개장", category: "문화생활", budget: "₩", type: "outdoor", description: "궁궐의 아름다운 야경", recommendedTime: "밤", transport: "대중교통" },
    { name: "여의도 한강공원", category: "액티비티", budget: "₩₩", type: "outdoor", description: "따릉이 타며 강바람 쐬기", recommendedTime: "밤", transport: "차량" },
    { name: "북촌 한옥마을", category: "문화생활", budget: "₩", type: "outdoor", description: "골목길 따라 전통미 느끼기", recommendedTime: "점심", transport: "도보" },
    { name: "낙산공원 야경", category: "액티비티", budget: "₩", type: "outdoor", description: "서울 성곽길 걷기", recommendedTime: "밤", transport: "대중교통" },
    { name: "강남역 거리 쇼핑", category: "쇼핑", budget: "₩₩", type: "outdoor", description: "북적이는 도심 활기 느끼기", recommendedTime: "저녁", transport: "대중교통" },
    { name: "망원 한강공원", category: "맛집", budget: "₩", type: "outdoor", description: "망원시장에서 사온 음식 피크닉", recommendedTime: "저녁", transport: "도보" },
    { name: "남산 타워 산책로", category: "액티비티", budget: "₩", type: "outdoor", description: "케이블카 타고 올라가는 경치", recommendedTime: "저녁", transport: "차량" },
    { name: "삼청동 예술의 거리", category: "문화생활", budget: "₩₩", type: "outdoor", description: "아기자기한 갤러리 골목", recommendedTime: "점심", transport: "도보" },
    { name: "반포 한강공원 분수", category: "액티비티", budget: "₩", type: "outdoor", description: "무지개 분수와 야경 감상", recommendedTime: "밤", transport: "대중교통" },
    { name: "서울숲 사슴우리", category: "액티비티", budget: "₩", type: "outdoor", description: "숲속 길 따라 산책하기", recommendedTime: "점심", transport: "도보" },
    { name: "청계천 밤도깨비 야시장", category: "맛집", budget: "₩₩", type: "outdoor", description: "맛있는 길거리 음식 축제", recommendedTime: "밤", transport: "대중교통" },
    { name: "서촌 골목 맛집 탐방", category: "맛집", budget: "₩₩", type: "outdoor", description: "오래된 느낌의 숨은 맛집들", recommendedTime: "저녁", transport: "도보" },
    { name: "인사동 쌈지길", category: "쇼핑", budget: "₩₩", type: "outdoor", description: "한국적인 아이템 구경하기", recommendedTime: "점심", transport: "도보" },
    { name: "해방촌 노을 테라스", category: "카페", budget: "₩₩", type: "outdoor", description: "노을이 아름다운 테라스 카페", recommendedTime: "저녁", transport: "대중교통" },
    { name: "덕수궁 돌담길", category: "문화생활", budget: "₩", type: "outdoor", description: "같이 걸으면 행복한 꽃길", recommendedTime: "점심", transport: "대중교통" },
    { name: "익선동 한옥 맛집", category: "맛집", budget: "₩₩₩", type: "outdoor", description: "전통 한옥에서 퓨전 요리", recommendedTime: "저녁", transport: "도보" },
    { name: "올림픽공원 나홀로나무", category: "액티비티", budget: "₩", type: "outdoor", description: "넓은 들판과 탁 트인 풍경", recommendedTime: "점심", transport: "차량" },
];
