import "./ViewProducts.css";
import { useContext } from "react";
import { AdminContext } from "./Components/AdminContext";
import { currencyFormat } from "../../utils/currency";
import Pagination from "../../Components/Pagination";

export default function ViewProducts() {
  const {products} = useContext(AdminContext);


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
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
          ))}

          

        </tbody>

      </table>

      {/* <Pagination 
        page={page} 
        totalPages={totalPages} 
        setPage={setPage} 
    /> */}

    </div>
  );
}