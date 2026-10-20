import React, { useState } from 'react';
import { products } from './data/products';
import Navbar from './components/Navbar';
import HeroShowcase from './components/HeroShowcase';
import LookbookSection from './components/LookbookSection';
import MipeueFilm from './components/MipeueFilm';
import Footer from './components/Footer';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleSelectProduct = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen bg-forest text-white selection:bg-cream selection:text-forest">
      <Navbar
        products={products}
        activeIndex={activeIndex}
        onSelectProduct={handleSelectProduct}
      />

      <main>
        <HeroShowcase
          products={products}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          direction={direction}
          setDirection={setDirection}
        />

        <LookbookSection
          products={products}
          onSelectProduct={handleSelectProduct}
        />

        <MipeueFilm />
      </main>

      <Footer />
    </div>
  );
}
