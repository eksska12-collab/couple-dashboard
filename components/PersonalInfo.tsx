
'use client';

import React, { useState } from 'react';
import { PersonalInfo as IPersonalInfo } from '@/lib/kv';
import { Eye, EyeOff, ShieldCheck, User, Phone } from 'lucide-react';

interface PersonalInfoProps {
    personalInfos: IPersonalInfo[];
}

const PersonalInfo = React.memo(({ personalInfos }: PersonalInfoProps) => {
    const [showAll, setShowAll] = useState(false);

    const maskSSN = (ssn: string): string => {
        if (showAll) return ssn;
        const [first, second] = ssn.split('-');
        if (!second) return ssn;
        return `${first}-${second[0]}******`;
    };

    const maskPhone = (phone: string): string => {
        if (showAll) return phone;
        // Format: 010-7631-8033 -> 010-****-8033
        const parts = phone.split('-');
        if (parts.length < 3) return phone;
        return `${parts[0]}-****-${parts[2]}`;
    };

    return (
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-rose-100 ring-1 ring-rose-50 overflow-hidden h-full">
            <div className="flex justify-between items-center mb-5 md:mb-6">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="text-rose-400" size={20} />
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">개인정보</h2>
                </div>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 text-rose-500 rounded-full text-xs font-bold hover:bg-rose-100 transition-colors shadow-sm active:scale-95"
                >
                    {showAll ? (
                        <>
                            <EyeOff size={14} /> 가리기
                        </>
                    ) : (
                        <>
                            <Eye size={14} /> 정보 보기
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {personalInfos.map((info, index) => (
                    <div key={index} className={`${index === 0 ? '' : 'pt-6 border-t border-rose-50 md:border-t-0 md:border-l lg:border-l-0 lg:border-t md:pl-6 lg:pl-0'}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-rose-100 p-1.5 rounded-lg text-rose-500">
                                <User size={16} />
                            </div>
                            <span className="font-bold text-gray-800">{info.name}</span>
                            <span className="text-[10px] bg-white border border-rose-200 text-rose-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                {info.mbti}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5 ml-1">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-rose-300 uppercase tracking-tight">주민등록번호</span>
                                <p className={`text-sm font-semibold tracking-wide ${showAll ? 'text-gray-700' : 'text-gray-400 select-none'}`}>
                                    {maskSSN(info.birthSSN)}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-rose-300 uppercase tracking-tight">연락처</span>
                                <div className="flex items-center gap-2">
                                    <Phone size={12} className="text-rose-200" />
                                    <p className={`text-sm font-semibold tracking-wide ${showAll ? 'text-gray-700' : 'text-gray-400 select-none'}`}>
                                        {maskPhone(info.phone)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-rose-300 uppercase tracking-tight">주소</span>
                                <p className={`text-sm leading-relaxed font-medium ${showAll ? 'text-gray-700' : 'text-gray-400 select-none'}`}>
                                    {showAll ? info.address : '개인정보 보호를 위해 마스킹됨'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default PersonalInfo;
