import './CartItemComponent.css';
import React, { useState, useEffect } from 'react';
import { IconTrash } from "@tabler/icons-react";

export default function CartItemComponent(props) {
    const [quantity, setQuantity] = useState(props.quantity);

    useEffect(() => {
        props.updateCartItemQuantity(props.product, quantity);
    }, [quantity]);

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={props.product.image} alt={props.product.name} />
            </div>
            <div className="cart-item-details">
                <h3>{props.product.name}</h3>
                <p>${(props.product.price / 100).toFixed(2)}</p>
            </div>
            <div className="cart-item-remove">
                <input type="number" min={1} max={10} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <IconTrash onClick={() => props.removeFromCart(props.product)} size={24} color='var(--warn)' />
            </div>
        </div>
    );
}