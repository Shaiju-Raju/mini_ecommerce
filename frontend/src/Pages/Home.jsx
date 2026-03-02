import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = queryParams.get("page");
    const [page, setPage] = useState(Number(pageFromUrl) || 1);
    const search = queryParams.get("search") || "";



    useEffect(() => {
        const pageFromUrl = queryParams.get("page");
        setPage(Number(pageFromUrl) || 1);
    }, [location.search]);


    useEffect ( () => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/products?page=${page}&limit=10&search=${search}`
                );

                
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);

            } catch (err) {
                setError("Unable to load products. Please try again.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }   

    fetchProducts();
    },[page, search]);

    if (loading) {
    return (
        <div className="loaderContainer">
        <div className="spinner"></div>
        <p>Loading products...</p>
        </div>
    );
    }
    
    if (error) return <h2 style={{ textAlign: "center", paddingTop: "20px" }}>{error}</h2>;

    return (
         
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                        
            <div className="containerStyle">
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <Pagination 
                page={page} 
                totalPages={totalPages} 
                setPage={setPage} 
            />
        </div>

        

        
    )

}