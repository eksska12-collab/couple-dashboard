'use client';

import React, { useMemo } from 'react';
import { Sparkles, Heart, Coins, Palette, Star, Activity, Clock, Lightbulb, Box } from 'lucide-react';
import { type FortuneDetail, loveFortunes, moneyFortunes, healthFortunes, colors, times, items } from '@/lib/data/fortune-data';

interface FortuneData {
    love: FortuneDetail;
    money: FortuneDetail;
    health: FortuneDetail;
    luckyColor: string;
    luckyNumber: number;
    luckyTime: string;
    luckyItem: string;
    stars: number;
}

const getDailyFortune = (seed: string): FortuneData => {
    const dateStr = new Date().toISOString().split('T')[0];
    const combinedSeed = seed + dateStr;
    let hash = 0;
    for (let i = 0; i < combinedSeed.length; i++) {
        hash = ((hash << 5) - hash) + combinedSeed.charCodeAt(i);
        hash |= 0;
    }
    const absHash = Math.abs(hash);

    return {
        love: loveFortunes[absHash % loveFortunes.length],
        money: moneyFortunes[absHash % moneyFortunes.length],
        health: healthFortunes[absHash % healthFortunes.length],
        luckyColor: colors[absHash % colors.length],
        luckyNumber: (absHash % 9) + 1,
        luckyTime: times[absHash % times.length],
        luckyItem: items[absHash % items.length],
        stars: (absHash % 3) + 3,
    };
};

const FortuneCard = React.memo(({ name, mbti, data }: { name: string; mbti: string; data: FortuneData }) => (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-100/50 shadow-sm hover:shadow-md transition-all space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-rose-50">
            <div>
                <h3 className="text-xl font-bold text-rose-600 flex items-center gap-2">
                    {name} <span className="text-xs font-normal px-2 py-0.5 bg-rose-100 text-rose-500 rounded-full">{mbti}</span>
                </h3>
            </div>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < data.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                ))}
            </div>
        </div>

        <div className="space-y-4">
            {/* 사랑운 */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-pink-500 mb-1">
                    <Heart size={18} className="fill-pink-500" />
                    <span className="font-bold text-sm">사랑운: {data.love.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pl-7">{data.love.description}</p>
                <p className="text-[11px] text-pink-400 font-medium pl-7 italic">{data.love.tip}</p>
            </div>

            {/* 금전운 */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                    <Coins size={18} className="fill-amber-500" />
                    <span className="font-bold text-sm">금전운: {data.money.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pl-7">{data.money.description}</p>
                <p className="text-[11px] text-amber-400 font-medium pl-7 italic">{data.money.tip}</p>
            </div>

            {/* 건강운 */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-500 mb-1">
                    <Activity size={18} />
                    <span className="font-bold text-sm">건강운: {data.health.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pl-7">{data.health.description}</p>
                <p className="text-[11px] text-emerald-400 font-medium pl-7 italic">{data.health.tip}</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-rose-50">
            <div className="flex items-center gap-2 bg-rose-50/50 p-2 rounded-xl">
                <Palette size={14} className="text-rose-400" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-rose-400 font-semibold">행운의 색</span>
                    <span className="text-xs font-bold text-gray-700">{data.luckyColor}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-rose-50/50 p-2 rounded-xl">
                <Lightbulb size={14} className="text-rose-400" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-rose-400 font-semibold">행운의 숫자</span>
                    <span className="text-xs font-bold text-gray-700">{data.luckyNumber}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-rose-50/50 p-2 rounded-xl">
                <Clock size={14} className="text-rose-400" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-rose-400 font-semibold">행운의 시간</span>
                    <span className="text-xs font-bold text-gray-700">{data.luckyTime}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-rose-50/50 p-2 rounded-xl">
                <Box size={14} className="text-rose-400" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-rose-400 font-semibold">럭키 아이템</span>
                    <span className="text-xs font-bold text-gray-700">{data.luckyItem}</span>
                </div>
            </div>
        </div>
    </div>
));

const Fortune = React.memo(() => {
    // useMemo로 운세 데이터 캐싱 - 하루에 한 번만 계산
    const jaehoonFortune = useMemo(() => getDailyFortune('jaehoon'), []);
    const doyoungFortune = useMemo(() => getDailyFortune('doyoung'), []);

    return (
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 border border-rose-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-5">
                <Sparkles size={150} className="text-rose-400" />
            </div>

            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-2xl shadow-sm">
                        <Sparkles className="text-rose-500" size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-rose-600 tracking-tight">오늘의 운세</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FortuneCard name="재훈" mbti="INFJ" data={jaehoonFortune} />
                    <FortuneCard name="도영" mbti="INFP" data={doyoungFortune} />
                </div>
            </div>
        </div>
    );
});

export default Fortune;
