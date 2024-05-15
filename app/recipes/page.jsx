"use client";
import {
  Card,
  CardBody,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { db } from "@/db";
import NextLink from "next/link";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useLiveQuery } from "dexie-react-hooks";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";
// TODO: add a new recipe button in the middle that shows as a recipe card if you have no recipes
export default function Recipes() {
  const [isLoading, setIsLoading] = useState();

  const recipes = useLiveQuery(
    () =>
      //toggle loading to true
      // setIsLoading(true);

      db.recipes.toArray()
    //toggle loading to false

    // setIsLoading(false);
  );
  if (!recipes) console.log("recipes not loaded");
  return (
    <>
      <SimpleGrid columns={[2, null, 4, 5, 7]} spacing={2.5} m={5}>
        {isLoading ? (
          <Spinner />
        ) : (
          recipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              imgUrl={recipe.imgUrl}
              recipename={recipe.recipeName}
              id={recipe.id}
            />
          ))
        )}
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
