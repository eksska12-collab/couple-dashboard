'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MapPin, Utensils, Coffee, Camera, Bike, RefreshCw, Sun, CloudRain, ShoppingBag, Clock, Navigation, Sparkles } from 'lucide-react';
import { type DateCourse, dateCourses } from '@/lib/data/date-courses-data';

// Fisher-Yates shuffle 알고리즘 - O(n) 시간 복잡도, 균등한 분포
const fisherYatesShuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const DateRecommendation = React.memo(() => {
    const [recommendations, setRecommendations] = useState<DateCourse[]>([]);
    const [weather, setWeather] = useState<"sunny" | "rainy">("sunny");

    // 필터링된 코스를 useMemo로 캐싱
    const filteredCourses = useMemo(() => {
        return dateCourses.filter(course =>
            weather === "sunny" ? true : course.type === "indoor"
        );
    }, [weather]);

    // getRecommendations를 useCallback으로 메모이제이션
    const getRecommendations = useCallback(() => {
        const shuffled = fisherYatesShuffle(filteredCourses);
        setRecommendations(shuffled.slice(0, 3));
    }, [filteredCourses]);

    useEffect(() => {
        getRecommendations();
    }, [getRecommendations]);

    const CategoryIcon = ({ category }: { category: string }) => {
        switch (category) {
            case "카페": return <Coffee size={16} />;
            case "맛집": return <Utensils size={16} />;
            case "문화생활": return <Camera size={16} />;
            case "액티비티": return <Bike size={16} />;
            case "쇼핑": return <ShoppingBag size={16} />;
            default: return <MapPin size={16} />;
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-rose-50 rounded-2xl">
                        <MapPin className="text-rose-500" size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-rose-600 tracking-tight">추천 데이트 코스</h2>
                </div>
                <button
                    onClick={getRecommendations}
                    className="p-2 hover:bg-rose-50 rounded-full text-rose-400 transition-all hover:rotate-180 duration-500"
                    title="새로고침"
                >
                    <RefreshCw size={22} />
                </button>
            </div>

            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setWeather("sunny")}
                    className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${weather === "sunny" ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "bg-rose-50 text-rose-400 hover:bg-rose-100"
                        }`}
                >
                    <Sun size={18} /> 야외 OK
                </button>
                <button
                    onClick={() => setWeather("rainy")}
                    className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${weather === "rainy" ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "bg-rose-50 text-rose-400 hover:bg-rose-100"
                        }`}
                >
                    <CloudRain size={18} /> 실내 위주
                </button>
            </div>

            <div className="space-y-4">
                {recommendations.map((course, idx) => (
                    <div key={idx} className="group bg-rose-50/20 hover:bg-rose-50/50 p-4 rounded-2xl border border-rose-100/30 transition-all cursor-default relative">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="p-2 bg-white text-rose-500 rounded-xl shadow-sm border border-rose-50">
                                    <CategoryIcon category={course.category} />
                                </span>
                                <div>
                                    <h3 className="font-bold text-gray-800 group-hover:text-rose-600 transition-colors">{course.name}</h3>
                                    <p className="text-[11px] text-gray-500 line-clamp-1">{course.description}</p>
                                </div>
                            </div>
                            <span className="text-xs font-black text-rose-400 bg-rose-50 px-2 py-1 rounded-lg">{course.budget}</span>
                        </div>

                        <div className="flex gap-3 mt-3 ml-11 border-t border-rose-100/50 pt-2">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                <Clock size={12} className="text-rose-300" />
                                {course.recommendedTime} 추천
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                <Navigation size={12} className="text-rose-300" />
                                {course.transport}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-rose-50 text-center">
                <p className="text-[10px] text-rose-300 font-bold flex items-center justify-center gap-1">
                    <Sparkles size={10} /> 서울 핫플레이스 {dateCourses.length}선 선정 <Sparkles size={10} />
                </p>
            </div>
        </div>
    );
});

export default DateRecommendation;
