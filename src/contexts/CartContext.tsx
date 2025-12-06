import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { courses, Course } from "@/data/courses";
import { toast } from "sonner";

interface CartItem {
  id: string;
  course_id: string;
  added_at: string;
  course: Course;
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (courseId: string) => Promise<void>;
  removeFromCart: (courseId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (courseId: string) => boolean;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      const cartItems = data.map((item) => {
        const course = courses.find((c) => c.id === item.course_id);
        return {
          ...item,
          course: course!,
        };
      }).filter((item) => item.course);
      setItems(cartItems);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (courseId: string) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .insert({ user_id: user.id, course_id: courseId });

    if (error) {
      if (error.code === "23505") {
        toast.info("Already in cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } else {
      toast.success("Added to cart");
      await fetchCart();
    }
  };

  const removeFromCart = async (courseId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("course_id", courseId);

    if (!error) {
      toast.success("Removed from cart");
      await fetchCart();
    }
  };

  const clearCart = async () => {
    if (!user) return;

    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    setItems([]);
  };

  const isInCart = (courseId: string) => {
    return items.some((item) => item.course_id === courseId);
  };

  const total = items.reduce((sum, item) => sum + (item.course?.price || 0), 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
