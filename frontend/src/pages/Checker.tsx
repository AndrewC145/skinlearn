import Analyze from "../components/ingredient-checker/Analyze";
import CommonIngredients from "../components/ingredient-checker/CommonIngredients";
import Faq from "../components/ingredient-checker/Faq";
import { useEffect } from "react";

function Checker() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Analyze />
      <CommonIngredients />
      <Faq />
    </>
  );
}

export default Checker;
