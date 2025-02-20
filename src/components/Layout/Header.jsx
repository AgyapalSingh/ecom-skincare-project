import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AnnounceMentBar from "../snippets/AnnounceMentBar";
import CartDrawer from "./CartDrawer";
import SearchDrawer from "./SearchDrawer";
import { PiShoppingCartSimple } from "react-icons/pi";
import { LuSearch, LuUserRound } from "react-icons/lu";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { cart } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems =
    cart.length > 0 ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="uniq-header">
      <div className="uniq-announementBar">
        <AnnounceMentBar />
      </div>

      <nav className="uniq-navbar ">
        <div className="uniq-navbar-logo">
          <Link to="/">
            <img
              alt="Uniqaya-Logo"
              width={150}
              height={50}
              src="https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Uniqaya_Logo_Wide_Clean_Functional.png?v=1724408288"
            />
          </Link>
        </div>

        <div className="uniq-navbar-menus">
          <ul className="uniq-navbar-menus-list ">
            <li>
              <NavLink to="/allcollections">All Collections</NavLink>
            </li>
            <li>
              <NavLink to="/products">All Products</NavLink>
            </li>
            <li>
              <NavLink to="/allcollections/bestsellers">Best Sellers</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blogs</NavLink>
            </li>
          </ul>
        </div>

        <div className="uniq-navbar-btns ">
          <div
            className="uniq-navbar-search"
            onClick={() => setIsSearchOpen(true)}
          >
            <LuSearch className="nav-icon" />
          </div>

          <div className="uniq-navbar-user">
            <LuUserRound className="nav-icon" />
          </div>

          <div className="uniq-navbar-cart" onClick={toggleDrawer}>
          <span className="uniq-cart-badge">{totalItems}</span>
            <PiShoppingCartSimple className="nav-icon" />
            
          </div>

          <div className="uniq-header-hamburger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <IoMdClose className="nav-icon" />
            ) : (
              <HiOutlineBars3CenterLeft className="nav-icon" />
            )}
          </div>
        </div>
      </nav>

      <div
        className={`uniq-mobile-nav-drawer ${
          isMobileMenuOpen ? "mobileDraweropen" : ""
        }`}
      >
        <ul className="uniq-mobile-nav-drawer-menu-list">
          <li onClick={toggleMobileMenu}>
            <NavLink to="/allcollections">All Collections</NavLink>
          </li>
          <li onClick={toggleMobileMenu}>
            <NavLink to="/products">All Products</NavLink>
          </li>
          <li onClick={toggleMobileMenu}>
            <NavLink to="/allcollections/bestsellers">Best Sellers</NavLink>
          </li>
          <li onClick={toggleMobileMenu}>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
        </ul>
        <div className="uniq-navbar-user-mobile">
          <div>
            <span>
              <LuUserRound className="nav-icon" />
            </span>
            <span> Account</span>
          </div>
        </div>
      </div>

      <SearchDrawer
        isOpen={isSearchOpen}
        closeDrawer={() => setIsSearchOpen(false)}
      />
      <CartDrawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
    </header>
  );
};

export default Header;
