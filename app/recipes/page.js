"use client";
import {
  Card,
  CardBody,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { db } from "@/db";
import NextLink from "next/link";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useLiveQuery } from "dexie-react-hooks";
import RecipeCard from "@/components/RecipeCard";
// TODO: add a new recipe button that shows as a recipe card and if you have no recipes in the middle
export default function Recipes() {
  const recipes = useLiveQuery(() => db.recipes.toArray());

  return (
    <>
      <SimpleGrid columns={[2, null, 4, 5, 7]} spacing={2.5} m={5}>
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            imgUrl={recipe.imgUrl}
            recipename={recipe.recipeName}
            id={recipe.id}
          />
        ))}
      </SimpleGrid>
      {/* Link button to add a new recipe */}
      <IconButton
        as={NextLink}
        href={"/newrecipe"}
        position={"fixed"}
        bottom={"20px"}
        right={["16px", "64px"]}
        aria-label="Search database"
        icon={<HiOutlineDocumentAdd />}
        colorScheme="green"
        size="lg"
      />
    </>
  );
}
