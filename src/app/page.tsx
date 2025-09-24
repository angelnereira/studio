import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import HomePageClient from '@/components/home-page-client';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // You can now pass the user object to the client component if needed
  // For example: <HomePageClient user={user} />
  // For now, we are not using it, but the logic is here.

  return <HomePageClient />;
}
