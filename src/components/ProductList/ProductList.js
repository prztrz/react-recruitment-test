import React, { useEffect } from 'react';
import './ProductList.css';
import { useCartRequest } from "../../apiClient/cart";
import { useAppContext } from "../../state/state";
import { ProductItem } from "../ProductItem/ProductItem"

export const ProductList = () => {
  const { items } = useAppContext();
  const cartRequest = useCartRequest();
  const {totalPrice, setTotalPrice} = useAppContext();

  useEffect(() => {
    if(items.state === "success") {
      const total = items.contents.reduce(
        (sum, {price}) => sum + Number(price), 0
      )
      
      setTotalPrice(total);
    }
  }, [items.state])

  return (
  <div className="container">
    <h3>Lista produktów</h3>
    
    {items.state === "loading" && <p>Pobieranie danych...</p>}
    {items.state === "error" && 
      <p>Wystąpił błąd, <button onClick={cartRequest}>spróbuj ponownie</button></p>}

    <ul>
      {items.state === "success" && items.contents.map(
        item => <ProductItem key={item.pid} item={item} />
      )}
    </ul>
    {items.state === "success" && (
      <p>
        suma: {totalPrice.toLocaleString("pl", {minimumFractionDigits: 2, maxFractionDigits: 2})} zł
      </p>
    )}
  </div>
)}