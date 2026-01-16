'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Utensils, Coffee, Camera, Bike, RefreshCw, Sun, CloudRain } from 'lucide-react';

interface DateCourse {
    name: string;
    category: "카페" | "맛집" | "문화생활" | "액티비티";
    budget: "₩" | "₩₩" | "₩₩₩";
    type: "indoor" | "outdoor";
    description: string;
}

const dateCourses: DateCourse[] = [
    { name: "성수동 카페거리", category: "카페", budget: "₩₩", type: "outdoor", description: "힙한 감성의 카페들이 모인 곳" },
    { name: "코엑스 별마당 도서관", category: "문화생활", budget: "₩", type: "indoor", description: "아름다운 도서관에서 여유로운 시간" },
    { name: "연남동 연트럴파크", category: "액티비티", budget: "₩", type: "outdoor", description: "돗자리 펴고 피크닉 즐기기" },
    { name: "익선동 한옥마을", category: "맛집", budget: "₩₩", type: "outdoor", description: "고즈넉한 한옥에서 맛있는 식사" },
    { name: "잠실 롯데월드몰", category: "액티비티", budget: "₩₩₩", type: "indoor", description: "쇼핑과 아쿠라리움을 한 번에" },
    { name: "삼성동 봉은사", category: "문화생활", budget: "₩", type: "outdoor", description: "도심 속 조용한 산책 코스" },
    { name: "망원동 소품샵 투어", category: "액티비티", budget: "₩₩", type: "outdoor", description: "아기자기한 소품 구경하기" },
    { name: "국립중앙박물관", category: "문화생활", budget: "₩", type: "indoor", description: "조용한 실내 데이트의 정석" },
    { name: "이태원 해방촌", category: "맛집", budget: "₩₩", type: "outdoor", description: "노을 맛집 테라스 카페 투어" },
    { name: "DDP 전시 관람", category: "문화생활", budget: "₩₩", type: "indoor", description: "현대적인 건축물과 전시 즐기기" },
    { name: "한강공원 치맥", category: "맛집", budget: "₩₩", type: "outdoor", description: "바람 쐬며 먹는 꿀맛 야식" },
    { name: "서울숲 산책", category: "액티비티", budget: "₩", type: "outdoor", description: "사슴도 보고 숲길도 걷기" },
];

export default function DateRecommendation() {
    const [recommendations, setRecommendations] = useState<DateCourse[]>([]);
    const [weather, setWeather] = useState<"sunny" | "rainy">("sunny");

    const getRecommendations = () => {
        // Current simulated weather logic
        const filtered = dateCourses.filter(course =>
            weather === "sunny" ? true : course.type === "indoor"
        );

        // Shuffle and pick 3
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        setRecommendations(shuffled.slice(0, 3));
    };

    useEffect(() => {
        getRecommendations();
    }, [weather]);

    const CategoryIcon = ({ category }: { category: string }) => {
        switch (category) {
            case "카페": return <Coffee size={16} />;
            case "맛집": return <Utensils size={16} />;
            case "문화생활": return <Camera size={16} />;
            case "액티비티": return <Bike size={16} />;
            default: return <MapPin size={16} />;
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <MapPin className="text-rose-500" size={24} />
                    <h2 className="text-2xl font-black text-rose-600 tracking-tight">추천 데이트 코스</h2>
                </div>
                <button
                    onClick={getRecommendations}
                    className="p-2 hover:bg-rose-50 rounded-full text-rose-400 transition-colors"
                    title="새로고침"
                >
                    <RefreshCw size={20} />
                </button>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setWeather("sunny")}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${weather === "sunny" ? "bg-rose-500 text-white shadow-md shadow-rose-200" : "bg-rose-50 text-rose-400"
                        }`}
                >
                    <Sun size={18} /> 야외 OK
                </button>
                <button
                    onClick={() => setWeather("rainy")}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${weather === "rainy" ? "bg-rose-500 text-white shadow-md shadow-rose-200" : "bg-rose-100/50 text-rose-400"
                        }`}
                >
                    <CloudRain size={18} /> 실내 데이트
                </button>
            </div>

            <div className="space-y-4">
                {recommendations.map((course, idx) => (
                    <div key={idx} className="group bg-rose-50/30 hover:bg-rose-50/60 p-4 rounded-2xl border border-rose-100/50 transition-all cursor-default">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-white text-rose-500 rounded-lg shadow-sm border border-rose-100">
                                    <CategoryIcon category={course.category} />
                                </span>
                                <h3 className="font-bold text-gray-800">{course.name}</h3>
                            </div>
                            <span className="text-xs font-bold text-rose-400">{course.budget}</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-9">{course.description}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-rose-50 text-center">
                <p className="text-[10px] text-rose-300 font-medium">서울 기준 추천 코스입니다 ✨</p>
            </div>
        </div>
    );
}
