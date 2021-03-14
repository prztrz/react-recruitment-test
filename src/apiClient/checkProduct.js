import { useCallback } from "react"
import { createRequest } from "./client";

const CHECK_PRODUCT_SCHEMA = {
  isError: "boolean",
  success: "boolean",
  message: "string",
  errorType: "string"
}

const checkProductRequest = createRequest({path: "/product/check", schema: CHECK_PRODUCT_SCHEMA});

export const useCheckProduct = (pid, quantity) =>  useCallback(async () => {
  try {
    const { isError } = await checkProductRequest({
      method: "POST",
      body: JSON.stringify({pid, quantity})
    });

    return isError;
  } catch(err) {
    console.error(error);
  };
  return isError;
  }, [pid, quantity])
