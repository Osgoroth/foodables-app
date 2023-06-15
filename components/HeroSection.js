import Head from "next/head";

import {
  Flex,
  VStack,
  useBreakpointValue,
  Stack,
  Text,
  Heading,
  Button,
  Link,
} from "@chakra-ui/react";

import NextLink from "next/link";

export default function HeroSection() {
  return (
    <>
      <Flex
        display={{ lg: "flex", md: "none", base: "none" }}
        w={"100vw"}
        h={"calc(100vh - 75px)"}
        backgroundImage={
          "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1276&dpr=2"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={8}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Heading
              color={"blackAlpha.800"}
              fontWeight={700}
              fontSize={"6xl"}
              lineHeight={"110%"}
            >
              Foodables
            </Heading>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={"4xl"}
            >
              Your recipes - organised.
            </Text>
            <Stack display={"row"}>
              <Link
                as={NextLink}
                _hover={"textDecoration=none"}
                href="/newrecipe"
              >
                <Button bg={"whiteAlpha.600"}>Get started</Button>
              </Link>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </>
  );
}
