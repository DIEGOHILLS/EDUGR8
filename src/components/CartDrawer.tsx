import { ShoppingCart, Trash2, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export function CartDrawer() {
  const { items, removeFromCart, clearCart, total, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      navigate("/auth");
      setOpen(false);
      return;
    }

    setCheckingOut(true);

    // Enroll in all courses
    const enrollments = items.map((item) => ({
      user_id: user.id,
      course_id: item.course_id,
      progress: 0,
    }));

    const { error } = await supabase
      .from("enrollments")
      .upsert(enrollments, { onConflict: "user_id,course_id" });

    if (error) {
      toast.error("Checkout failed. Please try again.");
    } else {
      await clearCart();
      toast.success("Checkout successful! You are now enrolled.");
      setOpen(false);
      navigate("/dashboard");
    }

    setCheckingOut(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-12rem)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setOpen(false);
                  navigate("/courses");
                }}
              >
                Browse Courses
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-secondary rounded-lg"
                  >
                    <img
                      src={item.course.image}
                      alt={item.course.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground line-clamp-1">
                        {item.course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.course.instructor}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        R{item.course.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.course_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="text-2xl font-bold text-foreground">
                    R{total.toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full"
                  variant="accent"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={checkingOut}
                >
                  {checkingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
