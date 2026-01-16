
export interface DDay {
    id: string;
    title: string;
    date: string;
    emoji: string;
}

export interface Schedule {
    id: string;
    title: string;
    date: string;
}

export interface PersonalInfo {
    name: string;
    birthSSN: string;
    address: string;
    mbti: string;
    phone: string;
}

export interface Data {
    ddays: DDay[];
    schedules: Schedule[];
    memo: string; // Keeping for backward compatibility but UI will be removed
    personalInfos: PersonalInfo[];
}

const STORAGE_KEY = 'couple_dashboard_data';

const DEFAULT_DATA: Data = {
    ddays: [
        { id: '1', title: '처음 만난 날', date: '2024-05-19', emoji: '❤️' }
    ],
    schedules: [
        { id: '1', title: '데이트', date: '2026-01-20' }
    ],
    memo: '',
    personalInfos: [
        {
            name: '김재훈',
            birthSSN: '950911-1******',
            address: '경기도 성남시 중원구 금광1동 160-1번지 402호',
            mbti: 'INFJ',
            phone: '010-5779-9130'
        },
        {
            name: '여도영',
            birthSSN: '990208-2******',
            address: '부산광역시 금정구 금강로 503, 703동 1204호',
            mbti: 'INFP',
            phone: '010-7631-8033'
        }
    ]
};

export const storage = {
    get: (): Data => {
        if (typeof window === 'undefined') return DEFAULT_DATA;
        const item = localStorage.getItem(STORAGE_KEY);
        if (!item) return DEFAULT_DATA;

        try {
            const parsed = JSON.parse(item);
            // Migration logic for phone and other fields
            const mergedPersonalInfos = (parsed.personalInfos || DEFAULT_DATA.personalInfos).map((info: any, index: number) => {
                const defaultInfo = DEFAULT_DATA.personalInfos[index] || DEFAULT_DATA.personalInfos[0];
                return {
                    ...defaultInfo,
                    ...info,
                    phone: info.phone || defaultInfo.phone
                };
            });

            return {
                ...DEFAULT_DATA,
                ...parsed,
                personalInfos: mergedPersonalInfos
            };
        } catch (e) {
            return DEFAULT_DATA;
        }
    },
    set: (data: Data) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};
