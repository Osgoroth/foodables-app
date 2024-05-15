"use client";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  UnorderedList,
  OrderedList,
  List,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// TODO: make the text wrap
const IMAGE =
  "https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export default function ViewRecipe() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("recipe"));

  const recipe = useLiveQuery(async () => {
    // Query Dexie API
    const recipe = await db.recipes.where("id").equals(id).toArray();

    //  return the result
    return recipe;
  }, [id]);

  return Recipe(recipe);
}

function Recipe(recipe) {
  return (
    <Suspense>
      <Container my={"2.5%"}>
        {recipe?.map((result) => (
          <Grid
            key={result.id}
            templateColumns="repeat(5, 1fr)"
            templateRows="repeat(4, minContent)"
            columnGap={6}
            rowGap={3}
          >
            <GridItem colSpan={{ base: 5, md: 2 }} justifySelf={"left"}>
              <Image
                src={result.imgUrl}
                fill={true}
                width="150px"
                height="150px"
                alt="recipe image"
                borderRadius={10}
                objectFit="cover"
              />
            </GridItem>

            <GridItem colSpan={{ base: 5, md: 3 }} textAlign="left">
              <Heading as="h2" size="xl">
                {result.recipeName}
              </Heading>
            </GridItem>

            <GridItem colSpan={5}>
              <Heading as="h1" size="lg" borderBottom={"3px solid"}>
                Description
              </Heading>

              <Text>
                {(result.description == "") | null
                  ? "Oops, no description!"
                  : result.description}
              </Text>
            </GridItem>

            <GridItem colSpan={5}>
              <Heading as="h2" size="lg" borderBottom={"3px solid"}>
                Ingredients:
              </Heading>
              <UnorderedList>
                {result.ingredients.map((ingredient) => (
                  <Ingredient key={ingredient.name} ingredient={ingredient} />
                ))}
              </UnorderedList>
            </GridItem>

            <GridItem colSpan={5}>
              <Heading as="h2" size="lg" borderBottom={"3px solid"}>
                Method:
              </Heading>

              <List>
                {result.method.map((method, index) => (
                  <Method key={index} method={method} index={index} />
                ))}
              </List>
            </GridItem>
          </Grid>
        ))}
      </Container>
    </Suspense>
  );
}

function Ingredient({ key, ingredient }) {
  return (
    <li key={key}>
      {ingredient.amount} {ingredient.unit} {ingredient.name}
    </li>
  );
}

function Method({ key, method, index }) {
  return (
    <li key={key}>
      Step {index + 1}: {method.step}
    </li>
  );
}
