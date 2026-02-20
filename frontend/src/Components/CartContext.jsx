import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);


   
    const fetchCart = async () => {
        if (!token) {
            setCartCount(0);
            setCartItems([]);
            setSubTotal(0);
            return;
        }

        try {
            const res = await axios.get("http://localhost:3000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            setCartItems(res.data.items);
            setCartCount(res.data.totalItems);
            setSubTotal(res.data.total);
            
        } catch (err) {
            if(err.response?.status === 401) {
                localStorage.removeItem("token");
                setToken(null)
                setCartCount(0);
            }
            
            console.log("Fetch cart error", err);
        }
    }

    useEffect (() => {
        fetchCart();
    },[token])
        
  
    useEffect (() => {
        setUser(null);

        const fetchUser = async() => {
            if (!token) return;
            
            try {
                const res = await axios.get("http://localhost:3000/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setUser(res.data.name);

            } catch (err) {
                console.log("Fetch cart error", err);
            } 
        }
        fetchUser();
    },[token])

    return (
        <CartContext.Provider value={{cartItems, subTotal ,cartCount, setCartCount, setToken, token, user, fetchCart}} >
            {children}
        </CartContext.Provider>
    );
};
