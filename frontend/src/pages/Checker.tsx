import Analyze from "../components/Analyze";
import { useEffect } from "react";

function Checker() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Analyze />
    </>
  );
}

export default Checker;
