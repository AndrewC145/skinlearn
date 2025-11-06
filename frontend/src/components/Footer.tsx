import { Link } from "react-router";
import logo from "../assets/images/SKINLEARN.svg";

function Footer() {
  return (
    <footer className="font-figtree bg-black pt-20 text-white">
      <div className="flex items-center pb-10 pl-20">
        <div className="w-1/4">
          <h6 className="mb-3 text-lg font-semibold">Links</h6>
          <div className="mb-4 border-1"></div>
          <ul className="space-y-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pore-clogging-checker">Pore Clogging Checker</Link>
            </li>
            <li>
              <Link to="/routine-builder">Routine Builder</Link>
            </li>
          </ul>
        </div>
        <div className="mr-8 flex justify-end">
          <img className="size-4/5" src={logo} alt="Skinlearn logo" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
