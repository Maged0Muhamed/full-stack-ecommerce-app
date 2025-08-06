import { toaster } from "@/components/ui/toaster";
import type { IProduct } from "@/interfaces";

export const addItemToShoppingCart = (
  cartItems: IProduct[],
  product: IProduct
) => {
  const exist = cartItems.find(item => item.id === product.id);
  if (exist) {
    toaster.create({
      title: "Added To Your Cart ",
      description: "This item is already exist ,the quantity will be icreased ",
      type: "success",
    });
    return cartItems.map(item =>
      item.id === product.id ? { ...item, qyt: item.qyt && item.qyt + 1 } : item
    );
  }
  toaster.create({
    title: "Product Added",
    type: "success",
  });
  return [...cartItems, { ...product, qyt: 1 }];
};
export const removeItemFromShoppingCart = (
  cartItems: IProduct[],
  product: IProduct
) => {
  const filter = cartItems.filter(item => item.id !== product.id);
  if (filter) {
    toaster.create({
      title: "Removed From Your Cart ",
      // description: "This item is already exist ,the quantity will be icreased ",
      type: "info",
    });
    return [...filter];
  }
  toaster.create({
    title: "Your Cart is Clear",
    type: "success",
  });
  return [];
};
