import { Link } from "react-router";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

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
  ];

  return (
    <header className="bg-white">
      <nav className="px-6 py-4 text-black">
        <ul className="font-figtree flex items-center justify-between">
          <li>
            <Link to="/">
              <h1 className="text-4xl font-semibold">SKINLEARN</h1>
            </Link>
          </li>
          <ul className="flex items-center justify-center gap-8">
            {headerLinks.map((link, index) => (
              <li className="font-light hover:underline" key={index}>
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
            <HeaderDropDown />
          </ul>
        </ul>
      </nav>
    </header>
  );
}

function HeaderDropDown() {
  const { user, handleLogout } = useAuth();
  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer border-none bg-transparent shadow-none hover:bg-transparent"
          variant="outline"
        >
          <User className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30" align="start">
        {user ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <MenuItemHelper text="Log out" onClick={handleLogout} />
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuGroup>
              <Link to="/register">
                <MenuItemHelper text="Register" />
              </Link>
              <Link to="/login">
                <MenuItemHelper text="Sign In" />
              </Link>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuItemHelper({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <DropdownMenuItem onClick={onClick} className="cursor-pointer">
      {text}
    </DropdownMenuItem>
  );
}

export default Header;
