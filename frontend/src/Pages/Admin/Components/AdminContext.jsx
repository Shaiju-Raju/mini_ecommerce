    import axios from "axios";
    import { createContext, useState, useEffect, useContext} from "react";
    import { CartContext } from "../../../Components/CartContext";



    export const AdminContext = createContext();
    export const AdminProvider = ({children}) => {
        const [productsCount, setProductsCount] = useState(0);
        const [ordersCount, SetOrdersCount] = useState(0);
        const [totalRevenue, setTotalRevenue] = useState(0);
        const [userCount, setUserCount] = useState(0);
        const {token} = useContext(CartContext);
        const [products, setProducts] = useState([]);
        const [totalPage, setTotalPage] = useState(0); 
        const [error, setError] = useState("");





        //Fetching products
            const fetchProducts = async (page = 1, search = "") => {
                try {

                    const response = await axios.get(
                        `http://localhost:3000/api/products/admin?page=${page}&search=${search}`,{
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                    setProductsCount(response.data.totalProducts);
                    setProducts(response.data.products);
                    setTotalPage(response.data.totalPages);
                    

                } catch (err) {
                    setError("Unable to load products");
                    console.log(err);
                }
            }

            useEffect(() => {
                fetchProducts();
            }, [token]);




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

        // Fetching user Details

        useEffect(() => {
            if (!token) return;
            const fetchUserDetails = async () => {
                const response = await axios.get("http://localhost:3000/api/users/admin/all",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setUserCount(response.data.totalUsers);
            }
            fetchUserDetails();
        },[token])




        return (
            <AdminContext.Provider value={{
                productsCount,
                ordersCount,
                totalRevenue,
                userCount,
                products,
                fetchProducts,
                totalPage

            }}>
                {children}
            </AdminContext.Provider>
        )

    }