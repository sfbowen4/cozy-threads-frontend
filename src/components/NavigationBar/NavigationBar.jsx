import { Link } from "react-router-dom";
import "./NavigationBar.css";
import { IconShoppingBag } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import productData from "../../data/productData";

export default function NavigationBar({ ...props }) {
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        let count = 0;
        props.cartItems !== null && props.cartItems.forEach((item) => { // {id: int, quantity: int}
            for (let i = 0; i < item.quantity; i++) {
                const product = productData.find((product) => product.id === item.id);
                count += 1;
            }
            setCartItemCount(count);
        });
    }, [props.cartItems]);

    return (
        <div className="nav-bar">
            {/* <div className="nav-logo">
                Cozy Threads
            </div> */}
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/our-mission">Our Mission</Link>
            </div>
            <div className="cart-wrapper">
                <Link to="/checkout" className="cart-button">
                    <div className="cart-label">
                        My Bag ({cartItemCount})
                    </div>
                    <div className="cart-icon">
                        <IconShoppingBag size={28} />
                    </div>
                </Link>
            </div>
        </div>
    );
}