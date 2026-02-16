import { useContext } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AddToCartButton ({productId}) {
    const {setCartCount} = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");

            if(!token) {
                alert("Please login to add items");
                navigate("/login");
                return;
            }

            const res = await axios.post("http://localhost:3000/api/cart",{
                productId: productId,
                quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                );


        setCartCount(res.data.totalItems )

        } catch (err) {
            if(err.response?.status === 401){
                localStorage.removeItem("token");
                setCartCount(0);
                alert("Session expired. Please login again.");
            } else {
                console.log("Cart Error:", err);
            } 
        }
    }

    return (
        <button style={buttonStyle} onClick={handleAddToCart}>
            Add to Cart
        </button>
    )
};



const buttonStyle = {
  marginTop: "auto",  
  padding: "10px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  
};

