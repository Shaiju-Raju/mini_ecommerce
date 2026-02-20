import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import "./Home.css";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect ( () => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/products"
                );
                setProducts(response.data);

            } catch (err) {
                setError("Unable to load products. Please try again.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

    fetchProducts();
    },[]);

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
        </div>
    )

}