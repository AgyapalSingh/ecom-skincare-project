import React, { useState } from "react";
import AnnounceMentBar from "../snippets/AnnounceMentBar";
import NavigationMenu from "../snippets/NavigationMenu";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  const [cartCount, setCartCount] = useState(0); // Replace with actual cart state

  return (
    <header className="h-28 bg-[#183457] text-amber-50">
      <AnnounceMentBar />

      <div className="container mx-auto flex items-center justify-between h-full px-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>

        {/* Center: Navigation Menu */}
        <nav className="flex-grow flex justify-center">
          {/* <NavigationMenu /> */}
        </nav>

        {/* Right: Account & Cart Icons */}
        <div className="flex items-center space-x-6">
          <User className="w-6 h-6 cursor-pointer" />

          {/* Cart Icon with Badge */}
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > -1 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

