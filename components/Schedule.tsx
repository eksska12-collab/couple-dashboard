
'use client';

import React, { useState } from 'react';
import { Schedule } from '@/lib/kv';
import { Trash2, Plus, Calendar } from 'lucide-react';

interface ScheduleProps {
    schedules: Schedule[];
    onAdd: (schedule: Omit<Schedule, 'id'>) => void;
    onDelete: (id: string) => void;
}

const ScheduleList = React.memo(({ schedules, onAdd, onDelete }: ScheduleProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newDate) return;
        onAdd({ title: newTitle, date: newDate });
        setNewTitle('');
        setNewDate('');
        setIsAdding(false);
    };

    // Sort schedules by date
    const sortedSchedules = [...schedules].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-rose-100 ring-1 ring-rose-50 h-full">
            <div className="flex justify-between items-center mb-5 md:mb-6 text-2xl font-bold">
                <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl text-rose-400">🕒</span>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">공유 일정</h2>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="p-2.5 md:p-2 bg-rose-50 text-rose-500 rounded-full hover:bg-rose-100 transition-colors"
                >
                    <Plus size={20} />
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 bg-rose-50/50 rounded-2xl border border-rose-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid gap-3">
                        <input
                            type="text"
                            placeholder="일정 제목"
                            className="w-full p-2.5 rounded-xl border-none ring-1 ring-rose-100 focus:ring-2 focus:ring-rose-300 outline-none placeholder:text-rose-200"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                            type="date"
                            className="w-full p-2.5 rounded-xl border-none ring-1 ring-rose-100 focus:ring-2 focus:ring-rose-300 outline-none"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <button type="submit" className="w-full py-3 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition-colors font-bold shadow-sm shadow-rose-200">
                            추가하기
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
                {sortedSchedules.map((schedule) => (
                    <div key={schedule.id} className="relative group bg-white border-2 border-rose-50/50 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-rose-100 transition-all duration-300">
                        <div className="flex gap-4">
                            <div className="bg-rose-100/50 p-4 rounded-2xl text-rose-500 shrink-0 flex items-center justify-center">
                                <Calendar size={28} />
                            </div>
                            <div className="min-w-0 flex-1 flex flex-col justify-center">
                                <p className="text-xs md:text-sm font-bold text-rose-300 mb-1 uppercase tracking-wider">{schedule.date}</p>
                                <p className="font-bold text-gray-800 text-sm md:text-lg truncate">{schedule.title}</p>
                            </div>
                            <button
                                onClick={() => onDelete(schedule.id)}
                                className="opacity-100 md:opacity-0 group-hover:opacity-100 p-2 text-rose-200 hover:text-rose-600 transition-all self-start"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {schedules.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-rose-200 mb-2">📅</p>
                        <p className="text-rose-300 text-sm italic">중요한 일정을 등록해 보세요</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ScheduleList;
