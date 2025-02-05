import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AnnounceMentBar from "../snippets/AnnounceMentBar";
import CartDrawer from "./CartDrawer";
import { PiShoppingCartLight } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";

const Header = () => {
  const { cart } = useCart(); // Access cart state from the context
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get the total item count from the cart
  const totalItems =
    cart.length > 0 ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="h-28 bg-[#183457] text-amber-50  px-4 fixed top-0 right-0 left-0">
      <AnnounceMentBar />

      <nav className="container mx-auto flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <div className="text-3xl font-semibold text-white">
            <Link to="/" className="navbar-brand">
              <img
                className=" h-8"
                src="https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Uniqaya_Logo_Wide_Clean_Functional.png?v=1724408288"
              />
            </Link>
          </div>
        </div>

        <div>
          {/* Menu (You can add this as you prefer) */}
          <div className="mx-4">
            <ul>
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
                  to={"/collections/bestsellers"}
                  data-bs-toggle="dropdown"
                >
                  Best Sellers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative mx-4 cursor-pointer">
            <LuSearch className="text-white text-5xl" />
          </div>

          <div className="relative mx-4 cursor-pointer">
            <LuUserRound className="text-white text-5xl" />
          </div>

          {/* Cart Icon */}
          <div className="relative mx-4 cursor-pointer" onClick={toggleDrawer}>
            <PiShoppingCartLight className="text-white text-5xl" />
            {/* Display item count (show 0 if the cart is empty) */}
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </div>

          {/* Account Icon */}
          {/* <div className="mx-4">
            <User className="text-white text-2xl" />
          </div> */}
        </div>

        <CartDrawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
      </nav>
    </header>
  );
};

export default Header;
