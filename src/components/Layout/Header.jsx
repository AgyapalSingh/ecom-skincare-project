import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AnnounceMentBar from "../snippets/AnnounceMentBar";
import CartDrawer from "./CartDrawer";
import SearchDrawer from "./SearchDrawer";
import { PiShoppingCartLight } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";

const Header = () => {
  const { cart } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalItems =
    cart.length > 0 ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="h-28 bg-[#183457] text-amber-50 justify-center z-10 px-4 fixed top-0 right-0 left-0">
      <AnnounceMentBar />

      <nav className="container mx-auto flex items-center justify-between  justify-self-center px-4">
        <div className="flex items-center">
          <div className="text-3xl font-semibold text-white">
            <Link to="/" className="navbar-brand">
              <img
                alt="Uniqaya-Logo"
                width={"100%"}
                height={"100%"}
                className=" h-8"
                src="https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Uniqaya_Logo_Wide_Clean_Functional.png?v=1724408288"
              />
            </Link>
          </div>
        </div>

        <div>
          <div className="mx-4">
            <ul className="flex flex-row">
              <li>
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/allcollections"}
                  data-bs-toggle="dropdown"
                >
                  All Collections
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/allcollections/bestsellers"}
                  data-bs-toggle="dropdown"
                >
                  Best Sellers
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/blogs"}
                  data-bs-toggle="dropdown"
                >
                  Blogs
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center">
          <div
            className="relative mx-4 cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            <LuSearch className="text-white text-5xl" />
          </div>

          <div className="relative mx-4 cursor-pointer">
            <LuUserRound className="text-white text-5xl" />
          </div>

          <div className="relative mx-4 cursor-pointer" onClick={toggleDrawer}>
            <PiShoppingCartLight className="text-white text-5xl" />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
        </div>
        <SearchDrawer
          isOpen={isSearchOpen}
          closeDrawer={() => setIsSearchOpen(false)}
        />

        <CartDrawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
      </nav>
    </header>
  );
};

export default Header;
