const CartItem = ({ item }) => {
  return (
    <div className="cart-item">

      {/* LEFT - Product Image */}
      <div className="cart-image">
        <img src={item.image_url} alt={item.title} />
      </div>

      {/* RIGHT - Product Info */}
      <div className="cart-info">

        <div className="cart-top">
          <h4 className="item-title">{item.title}</h4>
          <p className="item-price">₹{item.price}</p>
        </div>

        {/* Quantity + Remove */}
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

export default CartItem;
