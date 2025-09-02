import React, { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  cartId: string;
  items: CartItem[];
  meta: any;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const createCart = async () => {
    try {
      const response = await fetch("https://api.primefocususa.com/v1/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const { cartId } = await response.json();
        setCart({ cartId, items: [], meta: null });
        localStorage.setItem("cartId", cartId);
      }
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  };

  const getCart = async (cartId: string) => {
    try {
      const response = await fetch(
        `https://api.primefocususa.com/v1/carts/${cartId}`
      );
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (
    productId: string,
    productName: string,
    price: number
  ) => {
    if (!cart) {
      await createCart();
      return;
    }

    // Add item to cart logic here
    const newItem: CartItem = {
      id: productId,
      name: productName,
      price,
      quantity: 1,
    };

    setCart((prev) =>
      prev
        ? {
            ...prev,
            items: [...prev.items, newItem],
          }
        : null
    );
  };

  useEffect(() => {
    const savedCartId = localStorage.getItem("cartId");
    if (savedCartId) {
      getCart(savedCartId);
    }

    // Listen for add to cart events
    const handleAddToCart = (event: CustomEvent) => {
      const { productId, productName, price } = event.detail;
      addToCart(productId, productName, price);
    };

    document.addEventListener("addToCart", handleAddToCart as EventListener);

    return () => {
      document.removeEventListener(
        "addToCart",
        handleAddToCart as EventListener
      );
    };
  }, []);

  const totalItems =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice =
    cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <>
      {/* Cart Icon */}
      <button
        data-cart-trigger
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:text-blue-400 transition-colors"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Shopping Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {cart && cart.items.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 border border-slate-200 rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {item.name}
                        </h3>
                        <p className="text-slate-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-slate-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 mb-4">Your cart is empty</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
