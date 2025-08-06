import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { Avatar, Menu, Portal } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CookieServies from "@/services/Cookie";
import { useSelector } from "react-redux";
import { cartSelector } from "@/redux/features/cart/cartSlice";
import { appDispatch } from "@/redux";
import { drawerTrigerAction } from "@/redux/features/global";

const Navbar = () => {
  const dispatch = appDispatch();
  const token = CookieServies.get("jwt");
  const links = ["Dashboard", "Products", "Team"];
  const { cartProducts } = useSelector(cartSelector);
  const logoutHandler = () => {
    CookieServies.remove("jwt");
    window.location.reload();
  };
  const drawerTrigerHandler = () => {
    dispatch(drawerTrigerAction());
  };
  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={7}>
          <ChakraLink asChild>
            <Link to={"/"}>My App</Link>
          </ChakraLink>
          <Stack direction={"row"} gap={7}>
            {links.map(link => (
              <ChakraLink asChild key={link}>
                <Link to={link.toLowerCase()}>{link}</Link>
              </ChakraLink>
            ))}
          </Stack>
        </Flex>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} gap={7}>
            <ColorModeButton />
            <Button
              onClick={drawerTrigerHandler}
            >{`Cart (${cartProducts.length})`}</Button>

            {token ? (
              <Menu.Root positioning={{ placement: "right-end" }}>
                <Menu.Trigger rounded="full" focusRing="outside">
                  <Avatar.Root size="sm">
                    <Avatar.Fallback name="Segun Adebayo" />
                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                  </Avatar.Root>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="account">Account</Menu.Item>
                      <Menu.Item value="settings">Settings</Menu.Item>
                      <Menu.Item value="logout" onClick={logoutHandler}>
                        Logout
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            ) : (
              <ChakraLink asChild>
                <Link to={"/login"}>Login</Link>
              </ChakraLink>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
