import React from 'react';
import { useAppState, Provider } from "../../state/state";
import { useCartRequest } from "../../apiClient/cart";
import { ProductList } from "../ProductList/ProductList"

const App = () => {
  const state = useAppState();

  return (
    <Provider value={state}>
      <ProductList />
    </Provider>
  );
};

export {
    App
};
