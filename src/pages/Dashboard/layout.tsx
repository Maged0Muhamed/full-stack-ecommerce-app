import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  type BoxProps,
  type FlexProps,
  Menu,
  Button,
  Portal,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiChevronDown,
  FiBell,
} from "react-icons/fi";
import { type IconType } from "react-icons";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Link, Outlet } from "react-router-dom";

interface LinkItemProps {
  to: string;
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  to: string;
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "dashboard", to: "/dashboard", icon: FiHome },
  { name: "products", to: "/dashboard/products", icon: FiTrendingUp },
  { name: "categories", to: "/dashboard/categories", icon: FiCompass },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRightWidth="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ to, icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      asChild
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Link to={to}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        // _icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack gap={{ base: "0", md: "6" }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu">
          <FiBell />
        </IconButton>
        <Flex alignItems={"center"}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar.Root size="sm">
                    <Avatar.Fallback name="Segun Adebayo" />
                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                  </Avatar.Root>
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    gap="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg={useColorModeValue("white", "gray.900")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                  divideY={"2px"}
                >
                  <Menu.Item value="Profile">Profile</Menu.Item>
                  <Menu.Item value="Settings">Settings</Menu.Item>
                  <Menu.Item value="Billing">Billing</Menu.Item>
                  <Menu.Item value="Signout">Sign out</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </HStack>
    </Flex>
  );
};

const DashBoardLayout = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />

      <Drawer.Root
        open={open}
        onOpenChange={onClose}
        // returnFocusOnClose={false}
        // onOverlayClick={onClose}
        size="full"
        placement={"start"}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer.Root>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashBoardLayout;

<Menu.Root positioning={{ placement: "right-end" }}>
  <Menu.Trigger rounded="full" focusRing="outside">
    <Avatar.Root size="sm">
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
      <VStack
        display={{ base: "none", md: "flex" }}
        alignItems="flex-start"
        gap="1px"
        ml="2"
      >
        <Text fontSize="sm">Justina Clark</Text>
        <Text fontSize="xs" color="gray.600">
          Admin
        </Text>
      </VStack>
    </Avatar.Root>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="account">Account</Menu.Item>
        <Menu.Item value="settings">Settings</Menu.Item>
        <Menu.Item value="logout">Logout</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>;
