'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Data, DDay, Schedule } from '@/lib/kv';
import DdayCounter from '@/components/DdayCounter';
import ScheduleList from '@/components/Schedule';
import PersonalInfo from '@/components/PersonalInfo';
import Fortune from '@/components/Fortune';
import DateRecommendation from '@/components/DateRecommendation';
import { Heart, Clock } from 'lucide-react';

interface DashboardClientProps {
    initialData: Data;
}

export default function DashboardClient({ initialData }: DashboardClientProps) {
    const [data, setData] = useState<Data>(initialData);
    const [currentTime, setCurrentTime] = useState(new Date());

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/api/data');
            if (response.ok) {
                const newData = await response.json();
                // Only update if data is different to avoid unnecessary re-renders
                if (JSON.stringify(newData) !== JSON.stringify(data)) {
                    setData(newData);
                }
            }
        } catch (error) {
            console.error('Failed to poll data:', error);
        }
    }, [data]);

    const saveData = async (newData: Data) => {
        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            if (response.ok) {
                setData(newData);
            }
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    };

    // Polling every 3 seconds
    useEffect(() => {
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, [fetchData]);

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAddDday = (dday: Omit<DDay, 'id'>) => {
        const newDday = { ...dday, id: Date.now().toString() };
        saveData({ ...data, ddays: [...data.ddays, newDday] });
    };

    const handleDeleteDday = (id: string) => {
        saveData({ ...data, ddays: data.ddays.filter(d => d.id !== id) });
    };

    const handleAddSchedule = (schedule: Omit<Schedule, 'id'>) => {
        const newSchedule = { ...schedule, id: Date.now().toString() };
        saveData({ ...data, schedules: [...data.schedules, newSchedule] });
    };

    const handleDeleteSchedule = (id: string) => {
        saveData({ ...data, schedules: data.schedules.filter(s => s.id !== id) });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ko-KR', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    return (
        <main className="min-h-screen bg-[#FFF5F7] text-gray-800 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 md:mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1.5 md:space-y-3">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-400 flex items-center justify-center md:justify-start gap-3 md:gap-4 leading-tight">
                            러브 다이어리 <Heart className="fill-rose-500 text-rose-500 animate-pulse shrink-0" size={28} />
                        </h1>
                        <p className="text-rose-400 font-semibold text-sm md:text-lg opacity-80">{formatDate(currentTime)}</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-md px-5 py-2.5 md:px-7 md:py-4 rounded-2xl shadow-sm border border-rose-100/50 self-center md:self-auto flex items-center gap-3">
                        <Clock size={18} className="text-rose-400" />
                        <span className="text-xl md:text-2xl font-mono font-bold text-rose-500 tracking-wider">
                            {formatTime(currentTime)}
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                    <div className="flex flex-col gap-6 md:gap-8">
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <DdayCounter
                                ddays={data.ddays}
                                onAdd={handleAddDday}
                                onDelete={handleDeleteDday}
                            />
                        </section>
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            <PersonalInfo
                                personalInfos={data.personalInfos}
                            />
                        </section>
                    </div>

                    <div className="flex flex-col gap-6 md:gap-8">
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-600 delay-100">
                            <ScheduleList
                                schedules={data.schedules}
                                onAdd={handleAddSchedule}
                                onDelete={handleDeleteSchedule}
                            />
                        </section>
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            <Fortune />
                        </section>
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-800 delay-400">
                            <DateRecommendation />
                        </section>
                    </div>
                </div>
            </div>

            <footer className="mt-12 md:mt-20 text-center opacity-30">
                <div className="flex justify-center gap-4 text-rose-400">
                    <span>✨</span>
                    <span>💖</span>
                    <span>✨</span>
                </div>
            </footer>
        </main>
    );
}
