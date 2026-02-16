import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);

    useEffect ( () => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

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
                    setCartCount(0);
                }
                
                console.log("Fetch cart error", err);
            }
        }
        fetchCart();
    },[])

    return (
        <CartContext.Provider value={{cartCount, setCartCount}} >
            {children}
        </CartContext.Provider>
    );
};
