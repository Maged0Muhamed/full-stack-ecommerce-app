import { Checkbox } from "@/components/ui/checkbox";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Field,
} from "@chakra-ui/react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "./../../../node_modules/@hookform/resolvers/yup/src/yup";
import { loginSchema } from "@/validation";
import { LOGIN_FORM } from "@/data";
import { loginSelector, userLogin } from "@/redux/features/login/loginSlice";
import { useSelector } from "react-redux";
import { appDispatch } from "@/redux";

export interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPage = () => {
  const { loading } = useSelector(loginSelector);
  const dispatch = appDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(userLogin(data));
    // try {
    //   //  * 2 - Fulfilled => SUCCESS => (OPTIONAL)
    //   const { status, data: resData } = await axiosInstance.post(
    //     "/auth/local",
    //     data
    //   );
    //   console.log(data);
    //   console.log(resData);
    //   if (status === 200) {
    //     toaster.create({
    //       description: "logged successfully",
    //       type: "success",
    //     });
    //     localStorage.setItem("loggedInUser", JSON.stringify(resData));
    //     setTimeout(() => {
    //       location.replace("/");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   //  * 3 - Rejected => FAILED => (OPTIONAL)
    //   const errorObj = error as AxiosError<IErrorResponse>;
    //   toaster.create({
    //     description: `${errorObj.response?.data.error.message}`,
    //     type: "error",
    //     duration: 1500,
    //   });
    // }
  };

  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => {
      return (
        <Field.Root key={idx} invalid={!!errors[name]}>
          <Field.Label>{name}</Field.Label>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, validation)}
          />
          {errors[name] && (
            <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
          )}
        </Field.Root>
      );
    }
  );

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack gap={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as={"span"} color={"blue.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          as="form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack gap={4}>
            {renderLoginForm}
            <Stack gap={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                loading={loading}
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default LoginPage;
