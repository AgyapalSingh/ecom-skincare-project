import React from "react";
import { useCart } from "../../context/CartContext";
import { RxCross2 } from "react-icons/rx";
import { TfiFaceSad } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, closeDrawer }) => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    createCheckout,
  } = useCart();

  const totalPrice = cart
    .reduce((total, item) => total + item.quantity * parseFloat(item.price), 0)
    .toFixed(2);

  return (
    <section
      className={`uniq-ag-cart-drawer-container ${isOpen ? "isOpen" : ""}`}
      onClick={closeDrawer}
    >
      <div
        className={`uniq-ag-cart-drawer ${isOpen ? "isOpen" : ""} `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="uniq-ag-cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="cursor-pointer" onClick={closeDrawer}>
            <RxCross2 />
          </button>
        </div>

        <div className="uniq-ag-cart-drawer-products">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="uniq-ag-cart-drawer-products-card">
                <div className="uniq-ag-cart-drawer-products-card-left">
                  <img
                    src={item.image || "default-image.jpg"}
                    alt={item.title}
                    className="uniq-ag-cart-drawer-products-card-left-img"
                  />
                  <div className="uniq-ag-cart-drawer-products-quantity">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="uniq-ag-cart-quantity-dec-btn"
                    >
                      -
                    </button>
                    <span className="uniq-ag-cart-quantity">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="uniq-ag-cart-quantity-inc-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="uniq-ag-cart-drawer-products-card-right">
                  <div className="uniq-ag-cart-drawer-products-card-title">
                    <Link
                      to={item.url}
                     
                    >
                      <p className="uniq-ag-cart-drawer-product-title">{item.title}</p>
                    </Link>

                    <span>{item.variantTitle}</span>
                  </div>
                  <div className="uniq-ag-cart-drawer-products-card-btn">
                    <p className="uniq-ag-cart-drawer-products-card-p">
                      <span>Rs. {item.quantity * item.price}</span>
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="uniq-ag-cart-empty-msg">
              <p>Your cart is empty.</p>
              <TfiFaceSad />
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-4 text-black">
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
              <button
                onClick={createCheckout}
                className="w-full bg-green-500 text-white py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartDrawer;
