
'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface MemoProps {
    initialContent: string;
    onSave: (content: string) => void;
}

export default function Memo({ initialContent, onSave }: MemoProps) {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSave(content);
        }, 1000);

        return () => clearTimeout(timer);
    }, [content, onSave]);

    return (
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col h-full ring-1 ring-rose-50">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl text-rose-400">📝</span>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">우리의 메모</h2>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full p-3 md:p-4 rounded-2xl bg-rose-50/30 border-none focus:ring-2 focus:ring-rose-200 resize-none text-sm md:text-base text-gray-700 placeholder-rose-300 transition-all duration-300 outline-none min-h-[150px]"
                placeholder="함께 나누고 싶은 이야기를 적어보세요..."
            />
            <div className="mt-2 text-right">
                <span className="text-xs text-rose-300 italic">내용은 자동으로 저장됩니다</span>
            </div>
        </div>
    );
}
