/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

function useDebounce(val: any, delay: number) {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);

  return debounceVal;
}
export default useDebounce;
