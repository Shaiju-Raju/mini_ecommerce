import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import Navbar from "../Components/Navbar.jsx";
import "./Home.css";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const containerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
        
    };

    const loaderContainer = {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const spinner = {
        width: "50px",
        height: "50px",
        border: "6px solid #ddd",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    };


    useEffect ( () => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/products"
                );

                setProducts(response.data);

                const token = localStorage.getItem("token");

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
            
            
            <Navbar />
            <div style={containerStyle}>
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )

}