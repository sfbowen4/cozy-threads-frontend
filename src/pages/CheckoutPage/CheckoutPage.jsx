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
    props.cartItems !== null && props.cartItems.forEach((item) => { // {id: int, quantity: int}
      for (let i = 0; i < item.quantity; i++) {
        const product = productData.find((product) => product.id === item.id);
        tempEnumItems.push({ id: product.id, amount: product.price });
        runningTotal += product.price;
      }
    });
    setEnumeratedCartItems(tempEnumItems);
    setTotal(runningTotal);
  }, [props.cartItems]);

  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#8b5e3b',
      colorText: '#4a3b2b'
    },
    // rules: {
    //   '.Checkbox': {
    //     backgroundColor: 'var(--background-color)',
    //     color: '#4a3b2b',
    //     borderColor: 'var(--primary-color)',
    //   },
    //   '.Tab': {
    //     border: '1px solid #e1c8a1',
    //     backgroundColor: '#a67c52',
    //     color: '#4a3b2b',
    //     boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
    //   },

    //   '.Tab:hover': {
    //     color: 'var(--colorText)',
    //   },

    //   '.Tab--selected': {
    //     borderColor: '#e1c8a1',
    //     backgroundColor: 'var(--accent-color)',
    //   },

    //   // See all supported class names and selector syntax below
    // }
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      <h1>Checkout</h1>
      {props.cartItems.length > 0 ? (
        <div className="checkout-page">
          <div className="checkout-left">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {props.cartItems.map((item) => {
                const product = productData.find((product) => product.id === item.id);
                return <CartItemComponent key={product.id} quantity={item.quantity} product={product} removeFromCart={props.removeFromCart} updateCartItemQuantity={props.updateCartItemQuantity}></CartItemComponent>;
              })}
            </div>

          </div>
          <div className="checkout-right">
            {clientSecret ? (
              <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                <CheckoutForm total={total} />
              </Elements >
            ) : (<span></span>)}
          </div>
        </div>
      ) : (
        <div className="empty-checkout">
          <h1>Nothing to see here.</h1>
          <h2>Put some items in your shoping bag to experience checkout!</h2>

        </div>
      )}
    </div>
  );
}