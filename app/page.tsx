import { kv } from '@vercel/kv';
import { KV_KEY, DEFAULT_DATA, Data } from '@/lib/kv';
import DashboardClient from './DashboardClient';

export default async function Home() {
  let initialData: Data = DEFAULT_DATA;

  try {
    const data = await kv.get<Data>(KV_KEY);
    if (data) {
      initialData = data;
    }
  } catch (error) {
    // 개발 환경에서만 에러 로깅
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch initial data from KV:', error);
    }
  }

  return <DashboardClient initialData={initialData} />;
}
