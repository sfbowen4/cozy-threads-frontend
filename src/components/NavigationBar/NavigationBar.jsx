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
            console.log(item)
            count += item.quantity;
        });
        console.log(count);
        setCartItemCount(count);
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
                <Link to="/cart" className="cart-button">
                    <div className="cart-label">
                        My Bag
                    </div>
                    <div className="cart-icon">
                        {cartItemCount}
                        <IconShoppingBag size={40} />
                    </div>
                </Link>
            </div>
        </div>
    );
}