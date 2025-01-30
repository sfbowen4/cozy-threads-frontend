import './ProductPreviewComponent.css';
import { useNavigate } from "react-router-dom";

export default function ProductPreviewComponent(props) {
    let navigate = useNavigate();
    return (
        <div className="product-preview">
            <div onClick={() => navigate(`/product/${props.product.id}`)}>
                <div className="product-image">
                    <img src={props.product.image} alt={props.product.name} />
                </div>
                <div className="product-details">
                    <div className="product-title">
                        <h3>{props.product.name}</h3>
                    </div>
                    <p>${(props.product.price / 100).toFixed(2)}</p>
                </div>
            </div>
            <button onClick={() => props.addToCart(props.product)}>Add to Cart</button>
        </div>
    );
}
