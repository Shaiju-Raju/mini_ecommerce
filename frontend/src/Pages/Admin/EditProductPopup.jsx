import "./EditProductPopup.css";
import { useEffect, useContext,useState } from "react";
import axios from "axios";
import { CartContext, } from "../../Components/CartContext";
import { AdminContext } from "./Components/AdminContext";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

export default function EditProductPopup({ product, closePopup }) {
    const {token} = useContext(CartContext);
    const {fetchProducts} = useContext(AdminContext);
    const [editedData, setEditedData] = useState ({
        title: "",
        description: "",
        price: "",
        image_url: "",
        stock: ""
    });

    useEffect(() => {
        if (product) {
            setEditedData({
            title: product.title,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            stock: product.stock
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const {name, value} =e.target;
        setEditedData((prev) => ({
            ...prev,
            [name]:value
        }));
    }

    //handle escape key event
   useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
            closePopup();
            }
        };

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };

    }, [closePopup]); 


    //submit the updation
    const handleUpdate = async(e) => {
        e.preventDefault();
        
        try {
            await axios.put(`${API_URL}/api/products/${product.id}`,
                editedData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            await fetchProducts();
            closePopup();
            toast.success("Product updated successfully",{
            autoClose: 800,});

        } catch (err) {
            console.log("error to update products", err);
            toast.error("Update failed");
        }
    }

  return (
    <div className="popup-overlay" onClick={closePopup}>

      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Product</h2>

        <form className="product-form" onSubmit={handleUpdate}>

          <div className="form-group">
            <label>Title</label>
            
            <input 
                type="text" 
                name="title"
                value={editedData.title}
                onChange={handleChange}
                required
             />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
                rows="4" 
                name="description"
                value={editedData.description}
                onChange={handleChange}
                required
                >
            </textarea>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Price</label>
                <input 
                type="number"
                name="price" 
                value={editedData.price}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input 
                type="number"
                name="stock" 
                value={editedData.stock}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input 
                type="text"
                name="image_url" 
                value={editedData.image_url}
                onChange={handleChange}
                required
            />
          </div>

          <div className="popup-buttons">
            <button className="update-btn" type="submit">Update Product</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}