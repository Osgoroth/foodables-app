"use client";
import {
  Container,
  Center,
  Flex,
  VStack,
  useBreakpointValue,
  Stack,
  Text,
  Heading,
  Button,
  Link,
  NextLink,
  Spacer,
} from "@chakra-ui/react";
// import "./globals.css";
import Navbuttons from "@/components/NavButtons";

export default function Home() {
  return (
    <>
      <Navbuttons />
      <Flex
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
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Heading size={"3xl"}>Foodables</Heading>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
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
