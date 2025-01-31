import "./CartPage.css";
import CartItemComponent from "../../components/CartItemComponent/CartItemComponent";
import productData from "../../data/productData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage(props) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let runningTotal = 0;
        props.cartItems !== null && props.cartItems.forEach((item) => { // {id: int, quantity: int}
            const product = productData.find((product) => product.id === item.id);
            runningTotal += product.price * item.quantity;
        });
        setTotal(runningTotal);
    });

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            {props.cartItems.length > 0 ? (
                <div>
                    <div className="cart-items">
                        {props.cartItems.map((item) => {
                            const product = productData.find((product) => product.id === item.id);
                            return <CartItemComponent key={product.id} isEditable={true} quantity={item.quantity} product={product} removeFromCart={props.removeFromCart} updateCartItemQuantity={props.updateCartItemQuantity}></CartItemComponent>;
                        })}
                    </div>
                    <div className="cart-summary">
                        <h2>Total: ${(total / 100).toFixed(2)}</h2>
                        <Link to="/checkout">Checkout</Link>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <h1>Nothing to see here.</h1>
                    <h2>Put some items in your shoping bag to experience checkout!</h2>
                </div>
            )}
        </div>
    );
}