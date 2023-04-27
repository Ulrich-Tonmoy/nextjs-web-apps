import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
  Text,
  Button,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

export default function Navbar() {
  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100">
      <Box fontSize="3xl" color="blue.400" fontWeight="bold" paddingLeft="2">
        <Link href="/">Quest</Link>
      </Box>
      <Spacer />
      <Box>
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link href="/" passHref>
            <Button mr="6px" p="6px">
              <FcHome />
              <Text ml="4px">Home</Text>
            </Button>
          </Link>
          <Link href="/search" passHref>
            <Button mr="6px" p="6px">
              <BsSearch />
              <Text ml="4px">Search</Text>
            </Button>
          </Link>
          <Link href="/search?purpose=for-sale" passHref>
            <Button mr="6px" p="6px">
              <FcAbout />
              <Text ml="4px">Buy Property</Text>
            </Button>
          </Link>
          <Link href="/search?purpose=for-rent" passHref>
            <Button p="6px">
              <FiKey />
              <Text ml="4px">Rent Property</Text>
            </Button>
          </Link>
        </Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outline"
            color="red.400"
            display={["flex", "flex", "none", "none"]}
          />
          <MenuList>
            <Link href="/" passHref>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </Link>
            <Link href="/search" passHref>
              <MenuItem icon={<BsSearch />}>Search</MenuItem>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
              <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
              <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
