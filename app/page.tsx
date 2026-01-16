
'use client';

import React, { useState, useEffect } from 'react';
import { storage, Data, DDay, Schedule } from '@/lib/storage';
import DdayCounter from '@/components/DdayCounter';
import ScheduleList from '@/components/Schedule';
import PersonalInfo from '@/components/PersonalInfo';
import { Heart, Clock } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load data on mount
  useEffect(() => {
    setData(storage.get());
  }, []);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save data whenever it changes (mostly auto-save from elsewhere if we had editing)
  useEffect(() => {
    if (data) {
      storage.set(data);
    }
  }, [data]);

  if (!data) return (
    <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Heart className="text-rose-300 fill-rose-300" size={48} />
        <p className="text-rose-400 font-medium">우리만의 공간을 불러오는 중...</p>
      </div>
    </div>
  );

  const handleAddDday = (dday: Omit<DDay, 'id'>) => {
    const newDday = { ...dday, id: Date.now().toString() };
    setData({ ...data, ddays: [...data.ddays, newDday] });
  };

  const handleDeleteDday = (id: string) => {
    setData({ ...data, ddays: data.ddays.filter(d => d.id !== id) });
  };

  const handleAddSchedule = (schedule: Omit<Schedule, 'id'>) => {
    const newSchedule = { ...schedule, id: Date.now().toString() };
    setData({ ...data, schedules: [...data.schedules, newSchedule] });
  };

  const handleDeleteSchedule = (id: string) => {
    setData({ ...data, schedules: data.schedules.filter(s => s.id !== id) });
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
        {/* Header */}
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

        {/* Dashboard Grid - Simplified Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Left Column: D-Day & Personal Info */}
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

          {/* Right Column: Schedules */}
          <div className="flex flex-col">
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-600 delay-100 h-full">
              <ScheduleList
                schedules={data.schedules}
                onAdd={handleAddSchedule}
                onDelete={handleDeleteSchedule}
              />
            </section>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
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
