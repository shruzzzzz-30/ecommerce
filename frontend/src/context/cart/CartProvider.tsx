import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import type { ICart, IUpdateCartItem } from "../../types/Cart";
import toast from "react-hot-toast";

const CartProvider = (props: PropsWithChildren) => {
  // Store cart data from backend
  const [cart, setCart] = useState<ICart | null>(null);
  // Get user token from Auth context
  const { token } = useAuth();

  // Add a product to the cart
  const addCartItem = async (productId: string) => {
    if (!token) { // Check if user is logged in
      toast("You need to login first!", { icon: 'ℹ️' });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        body: JSON.stringify({ productId, quantity: 1 }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setCart(result); // Update cart state
        toast.success('Product successfully added!', { duration: 3000 });
        return;
      }

      toast(result.message, { duration: 3000, icon: "ℹ️" });
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later", { duration: 3000 });
    }
  };

  //  Update quantity of a product in the cart
  const updateCartItem = async (data: IUpdateCartItem) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setCart(result);
        toast.success('Product successfully updated!', { duration: 3000 });
        return;
      }

      toast.error(result.message);
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later", { duration: 3000 });
    }
  };

  //  Remove a product from the cart
  const removeCartItem = async (productId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setCart(result);
        toast.success('Product successfully removed!', { duration: 3000 });
        return;
      }

      toast.error(result.message);
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later", { duration: 3000 });
    }
  };

  //  Clear all items from the cart
  const clearCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setCart(result);
        toast.success('Your Cart successfully cleared!', { duration: 3000 });
        return;
      }

      toast.error(result.message);
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later", { duration: 3000 });
    }
  };

  //  Checkout the cart (place order)
  const checkout = async (address: string) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        body: JSON.stringify({ address }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setCart(null); // Empty the cart after successful order
        toast.success('Checkout successful! Your order is on its way.');
        return;
      }

      toast.error(result.message);
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later", { duration: 3000 });
    }
  };

  // Get current cart from backend
  const getCart = useCallback(async () => {
    if (token) {
      try {
        const res = await fetch(`${BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setCart(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Server error! Please try again later");
      }
    } else {
      setCart(null); // If no token, clear cart state
    }
  }, [token]);

  // Load cart when component mounts or token changes
  useEffect(() => {
    getCart();
  }, [getCart]);

  // Provide cart functions and data to children components
  return (
    <CartContext.Provider
      value={{ addCartItem, updateCartItem, removeCartItem, getCart, clearCart, checkout, cart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
