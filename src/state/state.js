import { createContext, useState, useMemo, useContext } from "react"



export const useAppState = () => {
  // initial state entries
  const [items, setItems] = useState({state: "initial", contents: null});
  const [totalPrice, setTotalPrice] = useState(0);

  return useMemo(() => (
    {items, setItems, totalPrice, setTotalPrice}
  ), [setItems, items.state, totalPrice, setTotalPrice])
}

// initial context
const initialContext = {
  items: {state: "initial", contents: null},
  setItems: () => {},
  totalPrice: 0,
  setTotalPrice: () => {}
}

export const context = createContext(initialContext);
export const { Provider } = context;

export const useAppContext = () => useContext(context);
