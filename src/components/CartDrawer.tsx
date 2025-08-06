import { appDispatch } from "@/redux";
import { cartSelector, clearCartAction } from "@/redux/features/cart/cartSlice";
import { drawerTrigerAction, globalSelector } from "@/redux/features/global";
import { Button, CloseButton, Drawer, Portal, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { IProduct } from "@/interfaces";
import CartDrawerItem from "./CartDrawerItem";
// import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { isCartDrawerOpened } = useSelector(globalSelector);
  const { cartProducts } = useSelector(cartSelector);
  const dispatch = appDispatch();

  // ** Handlers **
  const clearHandler = () => {
    dispatch(clearCartAction());
  };
  // ** Rendering **
  const cartItemsRender = cartProducts.length ? (
    cartProducts.map((product: IProduct) => (
      <CartDrawerItem key={product.documentId} product={product} />
    ))
  ) : (
    <Text> You've not added items yet </Text>
  );

  const drawerTrigerHandler = () => {
    dispatch(drawerTrigerAction());
  };
  return (
    <Drawer.Root open={isCartDrawerOpened} onOpenChange={drawerTrigerHandler}>
      {/* <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </Drawer.Trigger> */}
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Shoping Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{cartItemsRender}</Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={clearHandler}>
                Clear
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
export default CartDrawer;
