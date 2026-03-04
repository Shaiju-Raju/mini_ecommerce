import axios from "axios";
import { createContext, useState, useEffect, useContext} from "react";
import { CartContext } from "../../../Components/CartContext";

export const AdminContext = createContext();
export const AdminProvider = ({children}) => {
    const [productsCount, setProductsCount] = useState(0);
    const [ordersCount, SetOrdersCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const {token} = useContext(CartContext);



    //Fetching products
    useEffect (() => {
  
        const fetchProducts = async () => {
            try {

                const response = await axios.get(
                    "http://localhost:3000/api/products"
                );

                setProductsCount(response.data.totalProducts);

            } catch (err) {
                setError("Unable to load products");
                console.log(err);
            }
        }
        fetchProducts();
    },[]);

    //Fetcihng Orders

    useEffect (() => {
        if (!token) return; 
        const fetchOrders = async () => {
            const response = await axios.get("http://localhost:3000/api/orders/admin/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            SetOrdersCount(response.data.ordersCount)
            setTotalRevenue(response.data.totalRevenue);
        }
         fetchOrders();
    },[token])


    return (
        <AdminContext.Provider value={{
            productsCount,
            ordersCount,
            totalRevenue
        }}>
            {children}
        </AdminContext.Provider>
    )

}