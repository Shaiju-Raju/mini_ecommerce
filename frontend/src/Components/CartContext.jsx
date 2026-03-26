import axios from "axios";
import { createContext, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const CartContext = createContext();
export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [shippingRate, setShippingRate] = useState(0)
    const [shippingData, setShippingData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });


   // Fetcing the cart details
    const fetchCart = async () => {
        if (!token) {
            setCartCount(0);
            setCartItems([]);
            setSubTotal(0);
            return;
        }

        try {
            const res = await axios.get(`${API_URL}/api/cart`, {
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


// Calling fetchCart if any changes happen in token(side effect)
    useEffect (() => {
        fetchCart();
    },[token])
        
  
    //To get the user Profile (Name and other details)
    useEffect (() => {
        setUser(null);

        const fetchUser = async() => {
            if (!token) return;
            
            try {
                const res = await axios.get(`${API_URL}/api/users/profile`, {
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


    // To place the order
    const placeOrder = async () => {

        try {
            const res = await axios.post(`${API_URL}/api/cart/checkout`,
                shippingData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(res.data)
            return res.data;

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //Fetching ShippingRate
    useEffect (() => {
        const fetchShippingRate = async () => {
            const response = await axios.get(`${API_URL}/api/settings`);
            if(response) {
                setShippingRate(Number(response.data.shipping_rate));
            }
        }
        fetchShippingRate();
    },[]);

    
    const shippingCharge = Math.min(750, Math.round(subTotal * shippingRate));
    const total = subTotal + shippingCharge;



    // Returing the global context
    return (
        <CartContext.Provider value={{
            //Cart Items
            cartItems,
            cartCount,
            setCartCount,

            //Pricing
            subTotal,
            setSubTotal,
            shippingCharge,
            total,

            //Auth
            setToken,
            token,
            user,

            //Actions
            fetchCart,
            placeOrder,

            //Shipping Address and rate
            shippingData,
            setShippingData,
            shippingRate
        }}>
            {children}
        </CartContext.Provider>
    );
};
