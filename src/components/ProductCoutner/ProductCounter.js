import React, { useEffect, useState } from 'react';
import { useCheckProduct } from "../../apiClient/checkProduct";
import { useDebounced } from '../../hooks/useDebounced';
import { useAppContext } from '../../state/state';

export const ProductCounter = ({min = 1, max = Infinity, isBlocked = false, pid, price}) => {
  const [currentAmount, setCurrentAmount] = useState(min);
  const { setTotalPrice } = useAppContext()

  const debouncedAmount = useDebounced(currentAmount, 300);
  const checkProduct = useCheckProduct(pid, debouncedAmount);

  const handleChange = (type) => () => {
    const isIncrease = type === "increase" 
    const diffVal = isIncrease ? 1 : -1;
    const mathMethod = isIncrease ? Math.min : Math.max;
    const edgeVal = isIncrease ? max : min;

    setCurrentAmount(current => mathMethod(current + diffVal, edgeVal) );
    setTotalPrice(current => current + (diffVal * Number(price)));
  }

  const isDisabled = (type) => {
    if (isBlocked) return true;

     const edgeVal = type === "increase"  ? max : min;
     return currentAmount === edgeVal
  }

  useEffect(() => {
    const checkProductAmount = async () => {
      const isError = await checkProduct();
       
      if (isError) {
        setCurrentAmount(min)
      }
    }

    checkProductAmount();
  }, [checkProduct, setCurrentAmount])

  return (
    <div>
      <span>Obecnie masz {currentAmount} sztuk produktu</span>
      <button disabled={isDisabled("decrease")} onClick={handleChange("decrease")}>-</button>
      <button disabled={isDisabled("increase")} onClick={handleChange("increase")}>+</button>
    </div>
  )
}