import React from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, User } from "lucide-react";
import AnnounceMentBar from "../snippets/AnnounceMentBar";

const Header = () => {
  const { cart } = useCart(); // Access cart state from the context

  // Get the total item count from the cart
  const totalItems = cart.length > 0 ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header className="h-28 bg-[#183457] text-amber-50  px-4 fixed top-0 right-0 left-0">
      <AnnounceMentBar />

      <div className="container mx-auto flex items-center justify-between h-full px-4">
      <div className="flex items-center">
        <div className="text-3xl font-semibold text-white">Uniqaya</div>
      </div>

      <div className="flex items-center">
        {/* Menu (You can add this as you prefer) */}
        <div className="mx-4">
          <span className="text-white">Menu</span>
        </div>

        {/* Cart Icon */}
        <div className="relative mx-4">
          <ShoppingCart className="text-white text-2xl" />
          {/* Display item count (show 0 if the cart is empty) */}
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        </div>

        {/* Account Icon */}
        <div className="mx-4">
          <User className="text-white text-2xl" />
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
