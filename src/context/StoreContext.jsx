import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const StoreContext = createContext(null);

const CART_KEY = 'mipeue:cart:v2';
const CURRENCY_KEY = 'mipeue:currency';

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [currency, setCurrency] = useState(() => readStorage(CURRENCY_KEY, 'NIO'));
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [currency]);

  const addItem = useCallback((item) => {
    const key = [item.productId, item.color, item.size, item.fit || ''].join('|');
    setCart((prev) => {
      const existing = prev.find((x) => x.key === key);
      if (existing) {
        return prev.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { ...item, key, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((key, qty) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((x) => x.key !== key) : prev.map((x) => (x.key === key ? { ...x, qty } : x)),
    );
  }, []);

  const removeItem = useCallback((key) => {
    setCart((prev) => prev.filter((x) => x.key !== key));
  }, []);

  const value = useMemo(() => {
    const count = cart.reduce((acc, x) => acc + x.qty, 0);
    const subtotal = cart.reduce((acc, x) => acc + x.qty * x.price, 0);
    return {
      cart,
      count,
      subtotal,
      currency,
      setCurrency,
      addItem,
      updateQty,
      removeItem,
      isCartOpen,
      setCartOpen,
      isSizeGuideOpen,
      setSizeGuideOpen,
    };
  }, [cart, currency, addItem, updateQty, removeItem, isCartOpen, isSizeGuideOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore debe usarse dentro de <StoreProvider>');
  return ctx;
}
