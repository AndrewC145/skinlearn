import Analyze from "../components/Analyze";
import CommonIngredients from "../components/CommonIngredients";
import Faq from "../components/FAQ";
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
