import "./CheckoutPage.css";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from "react";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import productData from "../../data/productData";
import CartItemComponent from "../../components/CartItemComponent/CartItemComponent";

const stripePromise = loadStripe("pk_test_51Qm88ER2BhZW0JUn8Q2d3QzZspnluloDA9RWk1q7vKNxkuyCwhRVJGEMbOkm9XHj2Pks0L4qypkxK74Jc9w6Vr5L00eMY7ZVgk");

export default function CheckoutPage(props) {
  const [clientSecret, setClientSecret] = useState("");
  const [enumeratedCartItems, setEnumeratedCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (enumeratedCartItems.length === 0) {
      return;
    }
    fetch("https://cozy-threads-backend.azurewebsites.net/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: enumeratedCartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error(error)
      });
  }, [enumeratedCartItems]);

  useEffect(() => {
    let tempEnumItems = [];
    let runningTotal = 0;
    props.cartItems !== null && props.cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const product = productData.find((product) => product.id === item.id);
        tempEnumItems.push({ id: product.id, amount: product.price });
        runningTotal += product.price;
      }
    });
    setEnumeratedCartItems(tempEnumItems);
    console.log(runningTotal);
    setTotal(runningTotal);
  }, [props.cartItems]);

  const appearance = {
    theme: 'flat',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    props.cartItems.length > 0 ? (
      <div className="checkout-page">
        <div className="checkout-left">
          <h1>Checkout</h1>
          <h2>Order Summary</h2>
          <ul>
            {props.cartItems.map((item) => {
              const product = productData.find((product) => product.id === item.id);
              return <CartItemComponent key={product.id} quantity={item.quantity} product={product} removeFromCart={props.removeFromCart} updateCartItemQuantity={props.updateCartItemQuantity}></CartItemComponent>;
            })}
          </ul>
          <h2>Total: ${total / 100}</h2>
        </div>
        <div className="checkout-right">
          {clientSecret ? (
            <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
              <CheckoutForm clearCart={props.clearCart}/>
            </Elements >
          ) : (<span></span>)}
        </div>
      </div>
    ) : (
      <div className="empty-checkout">
        <h1>Nothing to see here.</h1>
        <h2>Put some items in your shoping bag to see checkout!</h2>
      </div>
    )
  );
}