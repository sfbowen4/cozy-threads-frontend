import { useEffect, useState } from "react";
import productData from "../../data/productData";
import "./ProductPage.css";
import { useParams } from 'react-router';

export default function ProductPage(props) {
    const { id } = useParams();
    const product = productData.find((product) => product.id === parseInt(id));

    return (
        product &&
        <div>
            <h1>{product.name}</h1>
            <div className="product-page">
                <img src={'../' + product.image} alt={product.name} />
                <div className="product-information">
                    <h3>{product.description}</h3>
                    <h2>${(product.price / 100).toFixed(2)}</h2>
                    <button onClick={() => props.addToCart(product)}>Add to Cart</button>
                </div>

            </div>
        </div>
    );
}