import './ProductPreviewComponent.css';

export default function ProductPreviewComponent(props) {
    return (
        <div className="product-preview">
            <div className="product-image">
                <img src={props.product.image} alt={props.product.name} />
            </div>
            <div className="product-details">
                <h3>{props.product.name}</h3>
                <p>${(props.product.price / 100).toFixed(2)}</p>
                <button onClick={() => props.addToCart(props.product)}>Add to Cart</button>
            </div>
        </div>
    );
}
