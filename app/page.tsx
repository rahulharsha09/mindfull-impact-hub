/**
 * app/page.tsx — Home page
 * StoreHydration wrapper prevents SSR hydration mismatch with Zustand persist.
 */
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import StoreHydration from '@/components/StoreHydration';

export default function Home() {
  return (
    <StoreHydration>
      <Header />
      <Dashboard />
      <Footer />
    </StoreHydration>
  );
}
