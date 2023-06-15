"use client";

import { Button, VStack, Link, Center } from "@chakra-ui/react";
import NextLink from "next/link";

const buttonHeight = "50px";
const buttonWidth = "175px";

export default function Navbuttons() {
  return (
    <Center
      h="calc(100vh - 75px)"
      display={{ lg: "none", base: "flex" }}
      backgroundImage={
        "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1276&dpr=2"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        spacing="0"
        
      >
        <Link as={NextLink} _hover={"textDecoration=none"} href="/newrecipe">
          <Button
            h={buttonHeight}
            w={buttonWidth}
            colorScheme="teal"
            borderBottomRadius="0"
          >
            New Recipe
          </Button>
        </Link>
        <Link as={NextLink} _hover={"textDecoration=none"} href="/recipes">
          <Button
            w={buttonWidth}
            h={buttonHeight}
            colorScheme="teal"
            borderRadius="0"
          >
            View Recipes
          </Button>
        </Link>
        <Link as={NextLink} _hover={"textDecoration=none"} href="/randomrecipe">
          <Button
            w={buttonWidth}
            h={buttonHeight}
            colorScheme="teal"
            borderTopRadius="0"
          >
            Random Recipe
          </Button>
        </Link>
      </VStack>
    </Center>
  );
}

//TODO: only show these buttons on mobile
