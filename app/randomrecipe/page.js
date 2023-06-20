"use client";
import { Container, Heading, Icon, Text } from "@chakra-ui/react";
import { FaToolbox } from "react-icons/fa";

export default function RandomRecipe() {
  // const res = await fetch(
  //   "https://www.themealdb.com/api/json/v1/1/random.php",
  //   { cache: "no-store" }
  // );

  // const data = await res.json();
  // const recipe = data.meals[0];
  // {recipe.strMeal}
  return (
    <Container centerContent={true}>
      <Heading mt={15} as={"h1"} size={{ lg: "3xl", base: "xl" }}>
        Under construction
      </Heading>
      <Icon as={FaToolbox} boxSize={192} />
      <Text>Come back later</Text>
    </Container>
  );
}
