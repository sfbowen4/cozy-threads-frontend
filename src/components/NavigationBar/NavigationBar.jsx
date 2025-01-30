import { Link } from "react-router-dom";
import "./NavigationBar.css";
import { IconShoppingBag } from "@tabler/icons-react";


export default function NavigationBar({ ...props }) {
    return (
        <div className="nav-bar">
            <div className="nav-logo">
                Cozy Threads
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/our-mission">Our Mission</Link>
            </div>
            <div className="cart-wrapper">
                <Link to="/checkout" className="cart-button">
                <div className="cart-label">
                My Bag ({props.cartItems.length})
                </div>
                <div className="cart-icon">
                    <IconShoppingBag size={28} />
                </div>
                </Link>
            </div>
        </div>
    );
}