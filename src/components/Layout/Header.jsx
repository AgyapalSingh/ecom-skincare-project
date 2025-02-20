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
    <header className="uniq-header">
      <div className="uniq-announementBar">
        <AnnounceMentBar />
      </div>

      <nav className="uniq-navbar  ">
        <div className="uniq-navbar-logo">
          <Link to="/">
            <img
              alt="Uniqaya-Logo"
              width={"150px"}
              height={"100%"}
              src="https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Uniqaya_Logo_Wide_Clean_Functional.png?v=1724408288"
            />
          </Link>
        </div>

        <div className="uniq-navbar-menus">
          <ul className="uniq-navbar-menus-list">
            <li>
              <NavLink to={"/allcollections"}>All Collections</NavLink>
            </li>

            <li>
              <NavLink to={"/products"}>All Products</NavLink>
            </li>

            <li>
              <NavLink to={"/allcollections/bestsellers"}>Best Sellers</NavLink>
            </li>

            <li>
              <NavLink to={"/blogs"}>Blogs</NavLink>
            </li>
          </ul>
        </div>

        <div className="uniq-navbar-btns">
          <div onClick={() => setIsSearchOpen(true)}>
            <LuSearch className="text-white text-5xl" />
          </div>

          <div>
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
