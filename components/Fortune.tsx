'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Coins, Palette, Star } from 'lucide-react';

interface FortuneData {
    love: string;
    money: string;
    luckyColor: string;
    stars: number;
}

const fortunes = {
    love: [
        "오늘은 사랑하는 사람과 특별한 시간을 보내세요.",
        "작은 배려가 상대방의 마음을 크게 움직입니다.",
        "서로에 대한 솔직한 대화가 운기를 높여줍니다.",
        "깜짝 선물이나 편지로 마음을 전해보세요.",
        "함께 산책하며 여유로운 대화를 즐기기에 좋은 날입니다.",
        "눈빛만 봐도 서로의 마음이 통하는 하루입니다.",
        "함께 새로운 맛집을 찾아 떠나보세요."
    ],
    money: [
        "불필요한 지출을 조심하고 저축에 신경 쓰세요.",
        "예상치 못한 소소한 이익이 생길 수 있습니다.",
        "계획적인 소비가 미래의 큰 행운을 가져옵니다.",
        "쇼핑보다는 함께하는 시간에 투자하세요.",
        "금전 운이 상승하는 날, 기분 좋은 소비를 즐겨보세요.",
        "지갑 관리에 철저하면 행운이 따릅니다.",
        "재테크에 대한 정보를 나누기에 좋은 날입니다."
    ],
    colors: [
        { name: "핑크", class: "bg-pink-400" },
        { name: "로즈", class: "bg-rose-400" },
        { name: "화이트", class: "bg-slate-50" },
        { name: "레드", class: "bg-red-400" },
        { name: "라벤더", class: "bg-purple-300" },
        { name: "베이지", class: "bg-orange-100" },
        { name: "하늘색", class: "bg-sky-300" }
    ]
};

const getDailyFortune = (seed: string): FortuneData => {
    // Use a simple hash from seed and current date string to make it consistent for the day
    const dateStr = new Date().toISOString().split('T')[0];
    const combinedSeed = seed + dateStr;
    let hash = 0;
    for (let i = 0; i < combinedSeed.length; i++) {
        hash = ((hash << 5) - hash) + combinedSeed.charCodeAt(i);
        hash |= 0;
    }
    const absHash = Math.abs(hash);

    return {
        love: fortunes.love[absHash % fortunes.love.length],
        money: fortunes.money[absHash % fortunes.money.length],
        luckyColor: fortunes.colors[absHash % fortunes.colors.length].name,
        stars: (absHash % 3) + 3, // 3 to 5 stars
    };
};

export default function Fortune() {
    const [jaehoonFortune, setJaehoonFortune] = useState<FortuneData | null>(null);
    const [doyoungFortune, setDoyoungFortune] = useState<FortuneData | null>(null);

    useEffect(() => {
        setJaehoonFortune(getDailyFortune('jaehoon'));
        setDoyoungFortune(getDailyFortune('doyoung'));
    }, []);

    if (!jaehoonFortune || !doyoungFortune) return null;

    const FortuneCard = ({ name, mbti, data }: { name: string; mbti: string; data: FortuneData }) => (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-rose-100/50 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-bold text-rose-600 flex items-center gap-2">
                        {name} <span className="text-xs font-normal px-2 py-0.5 bg-rose-100 text-rose-500 rounded-full">{mbti}</span>
                    </h3>
                </div>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < data.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-3 items-start">
                    <div className="p-2 bg-pink-50 rounded-xl text-pink-500 shrink-0">
                        <Heart size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-pink-500 mb-0.5">사랑운</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{data.love}</p>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <div className="p-2 bg-amber-50 rounded-xl text-amber-500 shrink-0">
                        <Coins size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-amber-500 mb-0.5">금전운</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{data.money}</p>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="p-2 bg-rose-50 rounded-xl text-rose-500 shrink-0">
                        <Palette size={18} />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-rose-500">행운의 색상:</p>
                        <span className="text-sm font-bold text-gray-700">{data.luckyColor}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 border border-rose-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={100} className="text-rose-400" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="text-rose-500" size={24} />
                    <h2 className="text-2xl font-black text-rose-600 tracking-tight">오늘의 운세</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FortuneCard name="재훈" mbti="INFJ" data={jaehoonFortune} />
                    <FortuneCard name="도영" mbti="INFP" data={doyoungFortune} />
                </div>
            </div>
        </div>
    );
}
