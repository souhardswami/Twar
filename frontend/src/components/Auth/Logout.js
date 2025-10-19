import React from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAuth } from "../utils/AuthContext";
import {
  Flex,
  Link,
  Button,
  Avatar,
  HoverCard,
  defineStyle,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <HoverCard.Root size="md">
      <HoverCard.Trigger asChild>
        <Link href="#">
          <Avatar.Root css={ringCss} colorPalette="teal">
            <Avatar.Fallback name="Random" />
            <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
          </Avatar.Root>
        </Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow />
            <Stack gap="10" direction="row">
              <Button onClick={handleLogout}>
                <Flex align="center" gap="2">
                  <Text>Logout</Text>
                  <RiLogoutCircleRLine />
                </Flex>
              </Button>
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  );
};

export default Logout;
