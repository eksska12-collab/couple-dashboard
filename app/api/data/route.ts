import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { KV_KEY, DEFAULT_DATA, Data } from '@/lib/kv';

export async function GET() {
    try {
        const data = await kv.get<Data>(KV_KEY);
        if (!data) {
            return NextResponse.json(DEFAULT_DATA);
        }
        return NextResponse.json(data);
    } catch (error) {
        // 개발 환경에서만 에러 로깅
        if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching from KV:', error);
        }
        return NextResponse.json(DEFAULT_DATA);
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await kv.set(KV_KEY, data);
        return NextResponse.json({ success: true });
    } catch (error) {
        // 개발 환경에서만 에러 로깅
        if (process.env.NODE_ENV === 'development') {
            console.error('Error saving to KV:', error);
        }
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
