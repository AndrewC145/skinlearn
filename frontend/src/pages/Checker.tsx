import Analyze from "../components/Analyze";
import CommonIngredients from "../components/CommonIngredients";
import { useEffect } from "react";

function Checker() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Analyze />
      <CommonIngredients />
    </>
  );
}

export default Checker;
