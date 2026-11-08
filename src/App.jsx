import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Catalog from './components/Catalog.jsx';
import PoliciesSection from './components/PoliciesSection.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SizeGuideModal from './components/SizeGuideModal.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <Header />
      <main className="flex-1">
        <Hero />
        <Catalog />
        <PoliciesSection />
      </main>
      <Footer />

      {/* Modales y Drawers */}
      <CartDrawer />
      <SizeGuideModal />
    </div>
  );
}
