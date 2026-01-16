
'use client';

import React, { useState } from 'react';
import { DDay } from '@/lib/storage';
import { Trash2, Plus } from 'lucide-react';

interface DdayCounterProps {
    ddays: DDay[];
    onAdd: (dday: Omit<DDay, 'id'>) => void;
    onDelete: (id: string) => void;
}

export default function DdayCounter({ ddays, onAdd, onDelete }: DdayCounterProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newEmoji, setNewEmoji] = useState('❤️');

    const calculateDdayDetail = (dateString: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const targetDate = new Date(dateString);
        targetDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - targetDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Detailed calculation (Years, Months, Days)
        let years = today.getFullYear() - targetDate.getFullYear();
        let months = today.getMonth() - targetDate.getMonth();
        let days = today.getDate() - targetDate.getDate();

        if (days < 0) {
            months -= 1;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        const detailStrings = [];
        if (years > 0) detailStrings.push(`${years}년`);
        if (months > 0) detailStrings.push(`${months}개월`);
        if (days > 0) detailStrings.push(`${days}일`);

        const detailed = detailStrings.length > 0 ? `(${detailStrings.join(' ')})` : '';

        let ddayStr = '';
        if (diffDays === 0) ddayStr = 'D-Day';
        else if (diffDays > 0) ddayStr = `D+${diffDays}`;
        else ddayStr = `D${diffDays}`;

        return { ddayStr, detailed };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newDate) return;
        onAdd({ title: newTitle, date: newDate, emoji: newEmoji });
        setNewTitle('');
        setNewDate('');
        setIsAdding(false);
    };

    return (
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-rose-100 ring-1 ring-rose-50 mb-6">
            <div className="flex justify-between items-center mb-5 md:mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl text-rose-400">📅</span>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">기념일</h2>
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
                            placeholder="제목 (예: 만난 날)"
                            className="w-full p-2.5 rounded-xl border-none ring-1 ring-rose-100 focus:ring-2 focus:ring-rose-300 outline-none placeholder:text-rose-200"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <input
                                type="date"
                                className="flex-1 p-2.5 rounded-xl border-none ring-1 ring-rose-100 focus:ring-2 focus:ring-rose-300 outline-none"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="💖"
                                className="w-16 p-2.5 text-center rounded-xl border-none ring-1 ring-rose-100 focus:ring-2 focus:ring-rose-300 outline-none"
                                value={newEmoji}
                                onChange={(e) => setNewEmoji(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full py-3 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition-colors font-bold shadow-sm shadow-rose-200">
                            추가하기
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {ddays.map((dday) => {
                    const { ddayStr, detailed } = calculateDdayDetail(dday.date);
                    return (
                        <div key={dday.id} className="group flex items-center justify-between p-3.5 md:p-4 bg-rose-50/30 rounded-2xl transition-all hover:bg-rose-50">
                            <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                <span className="text-xl md:text-2xl shrink-0">{dday.emoji}</span>
                                <div className="min-w-0">
                                    <p className="font-semibold text-gray-800 text-sm md:text-base truncate">{dday.title}</p>
                                    <p className="text-[10px] md:text-sm text-rose-300 font-medium">{dday.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 shrink-0 text-right">
                                <div className="flex flex-col items-end">
                                    <span className="text-base md:text-lg font-bold text-rose-500 italic leading-none">
                                        {ddayStr}
                                    </span>
                                    {detailed && (
                                        <span className="text-[9px] md:text-[11px] text-rose-400 font-medium mt-0.5">
                                            {detailed}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => onDelete(dday.id)}
                                    className="opacity-100 md:opacity-0 group-hover:opacity-100 p-2 text-rose-200 hover:text-rose-600 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
                {ddays.length === 0 && (
                    <div className="text-center py-8 text-rose-300 italic text-sm">기념일을 등록해 보세요!</div>
                )}
            </div>
        </div>
    );
}
