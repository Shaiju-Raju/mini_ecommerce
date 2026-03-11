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

        
        const fetchOrders = async () => {
            const response = await axios.get("http://localhost:3000/api/orders/admin/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            SetOrdersCount(response.data.ordersCount)
            setTotalRevenue(response.data.totalRevenue);
            return response.data.orders;
        }
          
       
         useEffect (() => {
            if (!token) return;
            fetchOrders();
          },[token])   


        //Fetching order Details
        const fetchOrderDetails = async (id) => {
            try {
                const response = await axios.get(`http://localhost:3000/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                } );

                return response.data

                
            } catch (err) {
                console.log("Error in fetching Order", err);
            }
        }

        // Fetching user Details
        const fetchUserDetails = async () => {
            const response = await axios.get("http://localhost:3000/api/users/admin/all",{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setUserCount(response.data.totalUsers);
            return response.data.users;
        }
            
        useEffect (() => {
            if (!token) return;
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
                totalPage,
                fetchOrders,
                fetchUserDetails,
                fetchOrderDetails

            }}>
                {children}
            </AdminContext.Provider>
        )

    }