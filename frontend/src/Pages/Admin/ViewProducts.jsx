import "./ViewProducts.css";
import { useContext,useEffect,useState } from "react";
import { AdminContext } from "./Components/AdminContext";
import { currencyFormat } from "../../utils/currency";
import Pagination from "../../Components/Pagination";
import EditProductPopup from "./EditProductPopup";
import axios from "axios";
import { CartContext } from "../../Components/CartContext";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


export default function ViewProducts() {
  const {products, fetchProducts, totalPage} = useContext(AdminContext);
  const {token} = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = queryParams.get("page");
  const [page, setPage] = useState(Number(pageFromUrl) || 1);
  const [search, setSearch] = useState("");


  useEffect (() => {
    fetchProducts(page)
  },[page])


  const handleEdit = (product) => {
    setSelectedProduct(product)
    setShowPopup(true);
  };

  const handleSearch = () => {
    console.log(search)
    fetchProducts(1,search)
    setSearch("")
  }


  const toggleProductStatus = async (product) => {

    const response = window.confirm(`Are you sure you want to ${product.is_active ? "disabled" : "enabled"} ?`)
    if(!response) return

    try {
      await axios.patch(
        `${API_URL}/api/products/${product.id}/status`,
        { is_active: !product.is_active },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(`Product ${product.is_active ? "disabled" : "enabled"}`, {
      autoClose: 800,});

      fetchProducts(page);

    } catch (err) {
      console.log("Error updating product status", err);
    }
  };

  return (
    <div className="view-products">

      <div className="view-header">

        <h2>View Products</h2>

        <div className="search-box">
          <input 
            value={search}
            type="text" 
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
             />
          <button className="search-btn" onClick={handleSearch}>
            
            🔍
          </button>
        </div>

      </div>

      <table className="product-table">

        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

        {products.map((product, index) => (
          <tr 
            key={product.id}
            className={!product.is_active ? "disabled-row" : ""}
          >
            <td>{(page -1) * 10 + (index + 1)}</td>
            <td>
              <img src={product.image_url} alt="product"/>
            </td>
            <td>{product.title}</td>
            <td>{currencyFormat(product.price)}</td>
            <td>{product.stock}</td>
            <td>
              {product.stock === 0 ? (
                <span className="status out">Out of Stock</span>
              ) : product.stock <= 10 ? (
                <span className="status low">Low Stock</span>
              ) : (
                <span className="status active">Active</span>
              )}
            </td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit (product)}>
              Edit</button>
              <button className="toggle-btn" onClick={() => toggleProductStatus(product)}>
  
                {product.is_active ? "Disable" : "Enable"}
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {showPopup && (
        <EditProductPopup
          product={selectedProduct}
          closePopup={() => setShowPopup(false)}
        />
      )}

      <Pagination 
        page={page} 
        totalPages={totalPage} 
        setPage={setPage} 
    />

    </div>
  );
}

