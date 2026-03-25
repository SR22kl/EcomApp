import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const WishListContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishListProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    setLoading(true);
    setWishlist(dummyWishlist);
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product: Product) => {
    setWishlist((prev) => {
      const exist = wishlist.find((p) => p._id === product._id);
      if (exist) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p._id === productId);
  };

  return (
    <>
      <WishListContext.Provider
        value={{ wishlist, loading, isInWishlist, toggleWishlist }}
      >
        {children}
      </WishListContext.Provider>
    </>
  );
}

export function useWishlist() {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishListProvider");
  }
  return context;
}
