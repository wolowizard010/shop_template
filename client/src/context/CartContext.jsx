import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    }

    function removeFromCart(productId) {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity < 1) return removeFromCart(productId);
        setCart(prev => prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    }

    function clearCart() { setCart([]); }

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);