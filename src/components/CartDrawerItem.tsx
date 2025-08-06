import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import type { IProduct } from "./../interfaces/index";
import { removeFromCartAction } from "@/redux/features/cart/cartSlice";
import { appDispatch } from "@/redux";
interface IProp {
  key: string;
  product: IProduct;
}

const CartDrawerItem = ({ product }: IProp) => {
  const {
    title,
    qyt,
    price,
    thumbnail: { url },
  } = product;
  const dispatch = appDispatch();

  // ** Handlers **
  const removeHandler = () => {
    dispatch(removeFromCartAction(product));
  };
  return (
    <>
      <Flex alignItems={"center"}>
        <Image
          mr={"3"}
          h={"80px"}
          w={"80px"}
          borderRadius={"full"}
          objectFit={"cover"}
          src={`${import.meta.env.VITE_SERVER_URL}${url}`}
          alt={title}
        />
        <Stack>
          <Text fontSize={"sm"}>{title}</Text>
          <Text fontSize={"sm"}>Price : ${price}</Text>
          <Text fontSize={"sm"}>Quantity : {qyt}</Text>
          <Button
            w="fit-content"
            size="xs"
            colorScheme="red"
            variant="solid"
            onClick={removeHandler}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
      <br color="white" />
    </>
  );
};

export default CartDrawerItem;
