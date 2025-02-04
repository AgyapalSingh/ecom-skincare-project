import React from "react";
import { useCart } from "../../context/CartContext"; // Import cart context
import { ShoppingCart } from "lucide-react"; // Import ShoppingCart from lucide-react

const CartDrawer = ({ isOpen, closeDrawer }) => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculate total price of items in the cart
  const totalPrice = cart
    .reduce((total, item) => total + item.quantity * parseFloat(item.price), 0)
    .toFixed(2);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeDrawer}
    >
      <div
        className={`fixed right-0 top-0 w-80 h-full bg-white p-4 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={closeDrawer}>Close</button>
        </div>

        {/* Cart items list */}
        <div className="mt-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between my-2"
              >
                <div>
                  <img
                    src={item.image || "default-image.jpg"}
                    alt={item.title}
                    className="w-16 h-16 object-cover"
                  />
                  <p className="text-sm">{item.title}</p>
                </div>
                <div>
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="text-sm">
                    Price: Rs. {item.quantity * item.price}
                  </p>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Cart summary */}
        {cart.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">Rs. {totalPrice}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={clearCart}
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Clear Cart
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
