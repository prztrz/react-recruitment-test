import { useCallback, useEffect } from "react";
import { useAppContext } from "../state/state"
import { createRequest } from "./client";

const CART_SCHEMA = {
  id: "cart",
  type: "array",
  items: {
    properties: {
      pid: { type: "string" },
      name: { type: "string" },
      price: { type: "string" },
      max: { type: "number" },
      min: { type: "number" },
      isBlocked: {type: "boolean"},
      required: ["pid", "name", "price", "max", "min"]
    }
  }
}

const cartRequest = createRequest({path: "/cart", schema: CART_SCHEMA});

export const useCartRequest = (init) => {
    const {items, setItems} = useAppContext();

    const makeRequest = useCallback(async (init) => {
      setItems({state: "loading", contents: null});

      try {
       const items = await cartRequest();
       setItems({state: "success", contents: items});
      } catch(error) {
        console.error(error)
        setItems({state: "error", contents: error})
      }
    }, [])

    useEffect(() => {
      makeRequest()
    }, [init, makeRequest])

    return makeRequest;
}