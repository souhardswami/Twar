import { Box, Flex, Link, Button, Image, Avatar, HoverCard, defineStyle, Portal, Strong, Stack, Text, HStack } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import  Logout from "../../components/Auth/Logout";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { useColorMode } from "../ui/color-mode"
import { MdLightMode, MdDarkMode } from "react-icons/md";




export default function NavBar() {
  // const token = localStorage.getItem("token");
  const { token } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode()


  useEffect(() => {
      console.log(token)
  }, [token])
  
  return (
    <Box as="nav" py={4}>
      <Flex justify="space-between" maxW="1200px" mx="auto" px={4}>
        <Button variant="brand" size="lg" fontWeight="bold">
          <Image src="/logo.png" alt="Logo" boxSize="50px" objectFit="cover" />
          Twar
        </Button>
        
        <Flex gap={4}>
          <Link as={RouterLink} to="/home" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Home</Button>
          </Link>
          
          <Link as={RouterLink} to="/pricing" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link as={RouterLink} to="/agent-studio" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Agent Studio</Button>
          </Link>
          <Link as={RouterLink} to="/workspace" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Workspace</Button>
          </Link>

          { token ? 
            <Logout /> : 
              <Link as={RouterLink} to="/login" _hover={{ textDecoration: "none" }}>
                <Button colorPalette="teal" variant="surface" >Login</Button>
              </Link>  }
          <Link as={RouterLink} to="/workspace" _hover={{ textDecoration: "none" }}>
            <Button variant="none" onClick={toggleColorMode}>
              {colorMode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
            </Button>
          </Link>
          
        </Flex>
      </Flex>
    </Box>
  );
}
