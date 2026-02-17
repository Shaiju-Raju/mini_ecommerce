import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect ( () => {
        const fetchCart = async () => {
            if (!token) {
                setCartCount(0);
                return;
            }

            try {
                const res = await axios.get("http://localhost:3000/api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setCartCount(res.data.totalItems);
            } catch (err) {
                if(err.response?.status === 401) {
                    localStorage.removeItem("token");
                    setToken(null)
                    setCartCount(0);
                }
                
                console.log("Fetch cart error", err);
            }
        }
        fetchCart();
    },[token])

    return (
        <CartContext.Provider value={{cartCount, setCartCount, setToken, token}} >
            {children}
        </CartContext.Provider>
    );
};
