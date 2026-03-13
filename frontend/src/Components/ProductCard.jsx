import AddToCartButton from "./AddToCartButton.jsx";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      <div style={imageWrapper}>
        {!imageLoaded && <div style={skeletonStyle}></div>}

        <img
          src={product.image_url}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{
            ...imageStyle,
            opacity: imageLoaded ? 1 : 0,
          }}
        />
      </div>

      <div style={contentStyle}>
        <h3>{product.title}</h3>
        <p style={{ color: "gray" }}>{product.description}</p>
        <h4>₹ {product.price}</h4>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
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
  transition: "opacity 0.3s ease",
};

const skeletonStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "#e0e0e0",
};

const imageWrapper = {
  position: "relative",
  width: "100%",
  height: "200px",
  overflow: "hidden",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};