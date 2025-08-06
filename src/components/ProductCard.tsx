import { Card, Image, Text } from "@chakra-ui/react";
import type { IProduct } from "./../interfaces/index";
import type { ReactNode } from "react";
interface IProp {
  key: string;
  product: IProduct;
  children?: ReactNode;
}

const ProductCard = ({ product, children }: IProp) => {
  const {
    title,
    description,
    price,
    thumbnail: { formats },
  } = product;

  return (
    <Card.Root overflow="hidden " maxW={"sm"} mx={"auto"}>
      <Image
        h={"200px"}
        w={"full"}
        borderRadius={"lg"}
        objectFit={"contain"}
        src={`${formats.thumbnail.url}`}
        alt="Greimport en double couch with wooden legs"
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer>{children}</Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
