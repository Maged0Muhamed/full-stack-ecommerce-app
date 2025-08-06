import {
  Box,
  Field,
  Flex,
  Input,
  NumberInput,
  Table,
  Textarea,
} from "@chakra-ui/react";
import { type IProduct } from "./../interfaces/index";
import DashboardProductsTableSkeletoon from "./TableSkeletoon";
import { Button, HStack, Image } from "@chakra-ui/react";
import {
  RiAddCircleFill,
  RiDeleteBin6Line,
  RiEditBoxLine,
  RiEyeLine,
} from "react-icons/ri";
import {
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
  useCreateDashboardProductMutation,
  useGetDashboardProductsQuery,
} from "@/redux/services/Dashboard/DashboardApiSlice";
import { Link } from "react-router-dom";
import AlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModal from "@/shared/Modal";

const DashboardProductsTable = () => {
  const defaultProductObj: IProduct = {
    title: "",
    description: "",
    price: "",
    stock: "",
    category: [
      {
        documentId: "",
        name: "",
      },
    ],
    thumbnail: {
      formats: {
        thumbnail: { url: "" },
      },
    },
  };
  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined | null
  >("");
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const { data, isLoading } = useGetDashboardProductsQuery({});
  const [
    deleteProduct,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteDashboardProductMutation();
  const [editProduct, { isLoading: isEditLoading, isSuccess: isEditSuccess }] =
    useUpdateDashboardProductMutation();
  const [addProduct, { isLoading: isAddLoading, isSuccess: isAddSuccess }] =
    useCreateDashboardProductMutation();

  const [isAlerDialogOpened, setIsAlerDialogOpened] = useState(false);
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!productToEdit) return;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
      id: productToEdit.id ?? 0, // Ensure id is always present
    } as IProduct);
  };
  const onSubmitUpdateHandler = () => {
    editProduct({
      documentId: selectedProductId,
      title: productToEdit.title,
      description: productToEdit.description,
      price: productToEdit.price,
      stock: productToEdit.stock,
      thumbnail,
    });
  };
  const onSubmitAddHandler = () => {
    addProduct({
      title: productToEdit.title,
      description: productToEdit.description,
      price: productToEdit.price,
      stock: productToEdit.stock,
      thumbnail,
    });
  };
  const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setThumbnail(e.target.files[0]);
    }
  };

  useEffect(() => {
    setSelectedProductId(null);
    setIsAlerDialogOpened(false);
  }, [isDeleteSuccess]);
  useEffect(() => {
    setSelectedProductId(null);
    setIsEditModalOpened(false);
  }, [isEditSuccess]);
  useEffect(() => {
    setIsAddModalOpened(false);
  }, [isAddSuccess]);
  if (!navigator.onLine) return <DashboardProductsTableSkeletoon />;

  if (isLoading) return <DashboardProductsTableSkeletoon />;
  return (
    <>
      {/*  Modal For Adding Product   */}
      <CustomModal
        isModalOpened={isAddModalOpened}
        setIsModalOpened={setIsAddModalOpened}
        titleText={"Add A Product"}
        cancelText={"Cancel"}
        okText={"Add"}
        onCancelClick={() => setProductToEdit(defaultProductObj)}
        onOkClick={onSubmitAddHandler}
        isLoading={isAddLoading}
      >
        <Box as={"form"} onSubmit={onSubmitAddHandler}>
          <Field.Root required>
            <Field.Label>Title</Field.Label>
            <Input
              value={productToEdit?.title}
              name="title"
              onChange={onChangeHandler}
              placeholder="Product Title"
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>Description</Field.Label>
            <Textarea
              value={productToEdit?.description}
              name="description"
              onChange={onChangeHandler}
              placeholder="Product description"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Price </Field.Label>
            <NumberInput.Root
              name="price"
              width={"full"}
              value={`${productToEdit?.price}`}
              onValueChange={e => {
                setProductToEdit({ ...productToEdit, price: e.value });
              }}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Stock </Field.Label>
            <NumberInput.Root
              name="stock"
              width={"full"}
              value={`${productToEdit?.stock}`}
              onValueChange={e =>
                setProductToEdit({ ...productToEdit, stock: e.value })
              }
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label>Thumbnail</Field.Label>
            <Input
              type="file"
              id="thumbnail"
              accept="image/png, image/gif, image/jpeg "
              onChange={onChangeThumbnailHandler}
            />
          </Field.Root>
        </Box>
      </CustomModal>
      {/*  Modal For Updating Product   */}
      <CustomModal
        isModalOpened={isEditModalOpened}
        setIsModalOpened={setIsEditModalOpened}
        titleText={"Edit A Product"}
        cancelText={"Cancel"}
        okText={"Update"}
        onOkClick={onSubmitUpdateHandler}
        onCancelClick={() => {
          setProductToEdit(defaultProductObj);
        }}
        isLoading={isEditLoading}
      >
        <Box as={"form"} onSubmit={onSubmitUpdateHandler}>
          <Field.Root required>
            <Field.Label>Title</Field.Label>
            <Input
              value={productToEdit?.title}
              name="title"
              onChange={onChangeHandler}
              placeholder="Product Title"
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>Description</Field.Label>
            <Textarea
              value={productToEdit?.description}
              name="description"
              onChange={onChangeHandler}
              placeholder="Product description"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Price </Field.Label>
            <NumberInput.Root
              name="price"
              width={"full"}
              value={`${productToEdit?.price}`}
              onValueChange={e => {
                setProductToEdit({ ...productToEdit, price: e.value });
              }}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Stock </Field.Label>
            <NumberInput.Root
              name="stock"
              width={"full"}
              value={`${productToEdit?.stock}`}
              onValueChange={e =>
                setProductToEdit({ ...productToEdit, stock: e.value })
              }
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label>Thumbnail</Field.Label>
            <Input
              type="file"
              id="thumbnail"
              accept="image/png, image/gif, image/jpeg "
              onChange={onChangeThumbnailHandler}
            />
          </Field.Root>
        </Box>
      </CustomModal>

      <AlertDialog
        isOpen={isAlerDialogOpened}
        setIsOpen={setIsAlerDialogOpened}
        titleText={"Are you sure?"}
        descriptionText={
          " This action cannot be undone. This will permanently delete your account and remove your data from our systems"
        }
        cancelText={"cancel"}
        okText={"Delete"}
        deleteHandler={() => deleteProduct(selectedProductId)}
        isLoading={isDeleteLoading}
      />
      <Flex direction={"column"} gapY={"3"} maxW={"95%"} mx={"auto"}>
        <Button
          colorPalette="teal"
          variant="solid"
          ml={"auto"}
          onClick={() => {
            setIsAddModalOpened(true);
          }}
        >
          <RiAddCircleFill /> Add
        </Button>

        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
              <Table.ColumnHeader>price</Table.ColumnHeader>
              <Table.ColumnHeader>stock</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                Action
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.data?.length ? (
              data.data.map((product: IProduct) => {
                const {
                  id,
                  documentId,
                  title,
                  stock,
                  category,
                  price,
                  thumbnail,
                } = product;
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{id}</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{category[0]?.name}</Table.Cell>
                    <Table.Cell>
                      <Image
                        src={thumbnail?.formats?.thumbnail.url}
                        boxSize="50px"
                        borderRadius="full"
                        fit="cover"
                        alt={title}
                      />
                    </Table.Cell>
                    <Table.Cell>{price}</Table.Cell>
                    <Table.Cell>{stock}</Table.Cell>
                    <Table.Cell justifyContent={"center"}>
                      <HStack justifyContent={"center"}>
                        <Button colorPalette="purple" variant="solid">
                          <Link
                            to={`${
                              import.meta.env.VITE_HOST_URL
                            }/products/${documentId}`}
                          >
                            <RiEyeLine />
                          </Link>
                        </Button>
                        <Button
                          colorPalette="red"
                          variant="solid"
                          onClick={() => {
                            setSelectedProductId(documentId);
                            setIsAlerDialogOpened(true);
                          }}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                        <Button
                          colorPalette="blue"
                          variant="solid"
                          onClick={() => {
                            setSelectedProductId(documentId);
                            setProductToEdit(product);
                            setIsEditModalOpened(true);
                          }}
                        >
                          <RiEditBoxLine />
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell>There is no products yet.</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Flex>
    </>
  );
};
export default DashboardProductsTable;
