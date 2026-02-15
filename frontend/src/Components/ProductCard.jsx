export default function ProductCard ({product}) {
    return (
        <div
        style={cardStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
        >
          
            <img
                src={product.image_url}
                alt={product.title}
                style={imageStyle}
            />
            <div style={contentStyle}>
                <h3>{product.title}</h3>
                <p style={{ color: "gray" }}> {product.description} </p>
                <h4>₹ {product.price}</h4>

                <button style={buttonStyle}>
                    Add to Cart
                </button>
            </div>

        </div>
    )

}

const cardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #dcdcdc",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const contentStyle = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
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