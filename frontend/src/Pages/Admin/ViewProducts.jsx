import "./ViewProducts.css";
import { useContext,useState } from "react";
import { AdminContext } from "./Components/AdminContext";
import { currencyFormat } from "../../utils/currency";
import Pagination from "../../Components/Pagination";
import EditProductPopup from "./EditProductPopup";

export default function ViewProducts() {
  const {products} = useContext(AdminContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)


  const handleEdit = (product) => {
    setSelectedProduct(product)
    setShowPopup(true);
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

        {products.map((product, index) => (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>
              <img src={product.image_url} alt="product"/>
            </td>
            <td>{product.title}</td>
            <td>{currencyFormat(product.price)}</td>
            <td>{product.stock}</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit ((product) )}>
              Edit</button>
              <button className="delete-btn">Delete</button>
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