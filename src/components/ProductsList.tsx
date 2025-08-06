import { useGetProductsListQuery } from "@/redux/services/Products/productsApiSlice";
import { Button, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import type { IProduct } from "@/interfaces";
import CardSkeleton from "./Sekelton";
import { Link, useLocation } from "react-router-dom";

// import { useGetProductsQuery } from "@/redux/Product/productApiSlice";

const ProductsList = () => {
  const { pathname } = useLocation();
  const { data, isLoading } = useGetProductsListQuery({});
  const skeletonLength = data && data.data.length;
  if (isLoading)
    return (
      data && (
        <Grid
          margin={30}
          templateColumns={"repeat(auto-fill,minmax(200px,1fr))"}
          gap="6"
        >
          {Array.from({ length: skeletonLength }, () => (
            <CardSkeleton />
          ))}
        </Grid>
      )
    );

  return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill,minmax(200px,1fr))"}
      gap="6"
    >
      {data &&
        data.data.map((product: IProduct) => (
          <ProductCard key={product.documentId} product={product}>
            <Button variant="solid" width={"full"} asChild>
              <Link to={`${pathname}/${product.documentId}`}>View Details</Link>
            </Button>
          </ProductCard>
        ))}
    </Grid>
  );
};

export default ProductsList;

// const [data, setData] = useState<IProduct[]>([]);

//   useEffect(() => {
//     axios
//       .get(
//         `${
//           import.meta.env.VITE_SERVER_URL
//         }/import { useAppDispatch, useAppSelector } from './../../node_modules/react-redux/dist/react-redux.d';
// api/products?populate=thumbnail&populate=category`
//       )
//       .then(res => {
//         setData(res.data.data);
//         console.log(res.data.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);
