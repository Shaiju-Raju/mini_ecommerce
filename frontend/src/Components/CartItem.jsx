import { currencyFormat } from "../utils/currency";

export default function CartItem ({item}) {
  return (
    <div className="cart-item">

      {/* Product Image */}
      <div className="cart-image">
        <img src={item.image_url} alt={item.title} />
      </div>

      {/* Product Info */}
      <div className="cart-info">

        <div className="cart-top">
          <div>
            <h4 className="item-title">{item.title}</h4>
            <p className="item-description">
              {item.description}
            </p>
            <p className="stock-text">In Stock</p>
          </div>

          <p className="item-price">{currencyFormat(item.price)}</p>
        </div>

        <div className="cart-actions">
          <div className="quantity-box">
            <button className="qty-btn">−</button>
            <span className="qty-number">{item.quantity}</span>
            <button className="qty-btn">+</button>
          </div>

          <button className="remove-btn">Delete</button>
        </div>

      </div>
    </div>
  );
};


