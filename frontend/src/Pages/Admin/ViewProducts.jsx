import "./ViewProducts.css";
import { useContext,useState } from "react";
import { AdminContext } from "./Components/AdminContext";
import { currencyFormat } from "../../utils/currency";
import Pagination from "../../Components/Pagination";
import EditProductPopup from "./EditProductPopup";
import axios from "axios";
import { CartContext } from "../../Components/CartContext";

export default function ViewProducts() {
  const {products, fetchProducts} = useContext(AdminContext);
  const {token} = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)


  const handleEdit = (product) => {
    setSelectedProduct(product)
    setShowPopup(true);
  };

  const toggleProductStatus = async (product) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/products/${product.id}/status`,
        { is_active: !product.is_active },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchProducts();

    } catch (err) {
      console.log("Error updating product status", err);
    }
  };

  return (
    <div className="view-products">

      <h2>View Products</h2>

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
            <td>{index + 1}</td>
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
              <button className="edit-btn" onClick={() => handleEdit ((product) )}>
              Edit</button>
              <button className="toggle-btn" onClick={() => toggleProductStatus(product)}>
                {console.log(product.is_active)}
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

      {/* <Pagination 
        page={page} 
        totalPages={totalPages} 
        setPage={setPage} 
    /> */}

    </div>
  );
}