import { Link } from "react-router";
import { User } from "lucide-react";

function Header() {
  const headerLinks = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/pore-clogging-checker",
      name: "Ingredient Checker",
    },
    {
      link: "/routine-builder",
      name: "Routine Builder",
    },
    {
      link: "/login",
      icon: <User className="text-black" />,
      label: "Account",
    },
  ];

  return (
    <header className="bg-white">
      <nav className="px-6 py-4 text-black">
        <ul className="font-figtree flex items-center justify-between">
          <li>
            <h1 className="text-4xl font-semibold">SKINLEARN</h1>
          </li>
          <ul className="flex gap-8">
            {headerLinks.map((link, index) => (
              <li className="font-light hover:underline" key={index}>
                <Link aria-label={link.label} to={link.link}>
                  {link.name ? link.name : link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
