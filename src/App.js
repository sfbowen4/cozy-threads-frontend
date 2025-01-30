// Stephen Bowen 2025

import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import MissionPage from './pages/MissionPage/MissionPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import CompletePageWrapper from './pages/CompletePage/CompletePage';

import React, { useState, useEffect, use } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      }));
    } else {
      setCartItems([...cartItems, { id: item.id, quantity: 1 }]);
    }
  }

  function removeFromCart(item) {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  }

  function updateCartItemQuantity(item, quantity) {
    setCartItems(cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: quantity };
      }
      return cartItem;
    }));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar cartItems={cartItems} />
        <Routes className="content">
          <Route path="*" element={<LandingPage />} />
          <Route index element={<LandingPage />} />
          <Route path="/catalog" element={<CatalogPage addToCart={addToCart} />} />
          <Route lazy={true} path="/checkout" element={<CheckoutPage cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} updateCartItemQuantity={updateCartItemQuantity} />} />
          <Route path="/complete" element={ <CompletePageWrapper /> } />
          <Route path="/our-mission" element={<MissionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
