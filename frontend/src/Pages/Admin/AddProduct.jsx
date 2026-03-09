import "./AddProduct.css";
import axios  from "axios";
import { useState, useContext } from "react";
import { CartContext } from "../../Components/CartContext";
import { toast } from "react-toastify";
import { AdminContext } from "./Components/AdminContext";
export default function AddProduct() {
  const {token} = useContext(CartContext);
  const {fetchProducts} = useContext(AdminContext)
  const [formData, setFormData] = useState ({
    title: "",
    description: "",
    price: "",
    image_url: "",
    stock: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!token) {
        alert("Please login to add items");
        navigate("/login");
        return;


    }
    try {
      await axios.post("http://localhost:3000/api/products",
        formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )

    toast.success("Product Added Successfully", {
    autoClose: 800,});

    fetchProducts();

    setFormData({
      title: "",
      description: "",
      price: "",
      image_url: "",
      stock: ""
    });

    } catch (err) {
      console.log("error to add products", err);

    }
  }



  return (

      <div className="form-card">
        <h2>Add New Product</h2>

        <form className="product-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
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
              value={formData.image_url}
              onChange={handleChange}
              required
              
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>

        </form>
      </div>

  );
}