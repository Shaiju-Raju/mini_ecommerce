import "./EditProductPopup.css";


export default function EditProductPopup({ product, closePopup }) {

  return (
    <div className="popup-overlay">

      <div className="popup-card">
        <h2>Edit Product</h2>

        <form className="product-form">

          <div className="form-group">
            <label>Title</label>
            <input type="text" defaultValue={product?.title} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" defaultValue={product?.description}></textarea>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Price</label>
              <input type="number" defaultValue={product?.price} />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input type="number" defaultValue={product?.stock} />
            </div>

          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input type="text" defaultValue={product?.image_url} />
          </div>

          <div className="popup-buttons">
            <button className="update-btn">Update Product</button>
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