import { NextRequest, NextResponse } from 'next/server';
import {
  getTotalSiteVisits,
  getDailyViews,
  getActiveVisitors,
  getPopularPages,
  getPageViews,
  getFullAnalytics,
} from '@/lib/analytics';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type') ?? 'summary';

  switch (type) {
    case 'total': {
      const total = await getTotalSiteVisits();
      return NextResponse.json({ total });
    }
    case 'daily': {
      const daily = await getDailyViews();
      return NextResponse.json({ daily });
    }
    case 'active': {
      const active = await getActiveVisitors();
      return NextResponse.json({ active });
    }
    case 'popular': {
      const pages = await getPopularPages(10);
      return NextResponse.json({ pages });
    }
    case 'page': {
      const path = searchParams.get('path') ?? '/';
      const views = await getPageViews(path);
      return NextResponse.json({ path, views });
    }
    case 'full': {
      const analytics = await getFullAnalytics();
      return NextResponse.json(analytics);
    }
    default: {
      const [total, daily, active] = await Promise.all([
        getTotalSiteVisits(),
        getDailyViews(),
        getActiveVisitors(),
      ]);
      return NextResponse.json({ total, daily, active });
    }
  }
}
