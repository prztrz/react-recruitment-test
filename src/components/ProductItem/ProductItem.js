import React from 'react';
import { ProductCounter } from '../ProductCoutner/ProductCounter';

export const ProductItem = ({item}) => {
  const { name, price, min, max, isBlocked, pid } = item;

  return (
    <li className="row">{name}, cena: {Number(price).toLocaleString("pl", {minimumFractionDigits: 2})} zł 
      <ProductCounter min={min} max={max} isBlocked={isBlocked} pid={pid} price={price}/>
    </li>
  )
}