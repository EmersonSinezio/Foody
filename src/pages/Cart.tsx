import React from "react";
import { useCart } from "../contexts/CartContext";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Cart: React.FC = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } =
    useCart();

  const calculateItemSubtotal = (item: any) => {
    const price = parseFloat(item.product.price.replace("$", ""));
    return price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemSubtotal(item),
      0
    );
  };
  const handleCheckout = () => {
    clearCart();
    toast.success("🎉 Compra realizada com sucesso!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <div className="flex items-center justify-center">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className="xs:w-[100%] md:w-[80%] lg:w-1/2 m-auto">
        <div className="mx-auto max-w-screen-xl h-[80vh] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            {cartItems.length > 0 ? (
              <div className="mt-4">
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.product.name}
                      className="flex xs:flex-col items-center justify-between gap-4 max-w-lg mx-auto"
                    >
                      <div className="flex items-center gap-4 ">
                        <img
                          src={item.product.imgSrc}
                          alt={item.product.name}
                          className="size-16 rounded object-cover h-full"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">
                            {item.product.name}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline">Price: </dt>
                              <dd className="inline font-bold">
                                {item.product.price}
                              </dd>
                            </div>

                            <div>
                              <dt className="inline">Quantity: </dt>
                              <dd className="inline font-bold">
                                {item.quantity}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="flex gap-2 ">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.product.name)}
                            className="text-gray-600 transition hover:text-red-600 text-2xl px-4 rounded-full bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            readOnly
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 flex items-center justify-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => increaseQuantity(item.product.name)}
                            className="text-gray-600 transition hover:text-green-600 text-2xl px-4 rounded-full bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-center border-t border-gray-100 pt-8 max-w-lg mx-auto">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>${calculateTotal().toFixed(2)}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>VAT</dt>
                        <dd>$0.00</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Discount</dt>
                        <dd>$0.00</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>${calculateTotal().toFixed(2)}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end" onClick={handleCheckout}>
                      <button className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center mt-8">
                <Alert />
                <Link
                  to="/products"
                  className="mt-4 border transition-all-500 border-gray-200 hover:bg-yellow-300 p-[1rem_2rem] rounded-md"
                >
                  Visitar produtos
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
