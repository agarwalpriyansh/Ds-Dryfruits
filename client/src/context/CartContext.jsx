import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, option = null) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product._id && 
                JSON.stringify(item.option) === JSON.stringify(option)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, {
          id: product._id,
          name: product.name,
          price: option ? option.price : product.price,
          image: product.image?.[0] || product.images?.[0], // Handle different image structures
          quantity,
          option,
          slug: product.slug || product._id // Fallback for linking
        }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId, option) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && JSON.stringify(item.option) === JSON.stringify(option))
      )
    );
  };

  const updateQuantity = (itemId, option, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, option);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === itemId && JSON.stringify(item.option) === JSON.stringify(option))
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
