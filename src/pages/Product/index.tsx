import ProductCard from "@/components/ProductCard";
import CardSkeleton from "@/components/Sekelton";
import { useGetProductQuery } from "@/redux/services/Products/productsApiSlice";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { appDispatch } from "@/redux";
import { addTocartAction } from "@/redux/features/cart/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery({ id });
  const product = data?.data;
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const dispatch = appDispatch();

  const addToCartHandler = () => {
    // const exist = cartProducts.includes(product);
    // if (exist) return;
    dispatch(addTocartAction(product));
  };

  if (isLoading) return <CardSkeleton />;

  return (
    <>
      <Box maxW="sm" mx={"auto"}>
        <Button variant="solid" onClick={goBack}>
          <IoIosArrowRoundBack />
          Back
        </Button>

        <ProductCard key={`${id}`} product={data.data}>
          <Button variant="solid" width={"full"} onClick={addToCartHandler}>
            Add To Cart
          </Button>
        </ProductCard>
      </Box>
    </>
  );
};
export default ProductPage;
