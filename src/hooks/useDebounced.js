import { useEffect, useRef, useState } from "react";

export const useDebounced = (value, delay) => {
  const timeoutId = useRef();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      if(timeoutId.current){
        clearTimeout(timeoutId.current)
      }
    }
  }, [value, delay])

  return debouncedValue;
}