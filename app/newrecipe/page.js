"use client";

import ImageUpload from "@/components/recipeform/ImageUpload";
import { db } from "@/db";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import {
  Flex,
  Input,
  Heading,
  FormControl,
  Container,
  InputGroup,
  Button,
  Textarea,
  FormErrorMessage,
  FormLabel,
  Spacer,
  VisuallyHidden,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Select,
  useColorModeValue,
  InputRightAddon,
} from "@chakra-ui/react";

const IMAGE =
  "https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const stepHeight = "80px";
const buttonWidth = "25px";

export default function NewRecipe() {
  const router = useRouter();

  const hourFormat = (val) => val + `h`;
  const minuteFormat = (val) => val + `m`;

  const redTheme = useColorModeValue("red.600", "red.400");
  const greenTheme = ["green.600", "green.500"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Drink", "Misc"];
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      imgUrl: IMAGE,
      name: "",
      description: "",
      recipeDuration: { minutes: 10, hours: 0 },
      mealType: "",
      servings: 2,
      region: "",
      ingredients: [{ amount: "", unit: "", name: "" }],
      method: [{ step: "" }],
    },
  });
  //  const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => saveRecipe(data);

  async function saveRecipe({
    imgUrl,
    recipeName,
    description,
    recipeDuration,
    mealType,
    servings,
    ingredients,
    method,
  }) {
    try {
      const id = await db.recipes.add({
        imgUrl: imgUrl,
        recipeName: recipeName,
        recipeDuration: recipeDuration,
        mealType: mealType,
        servings: servings,
        description: description,
        ingredients: ingredients,
        method: method,
      });
      // show toast for success or failure
      toast({
        title: `${recipeName} added successfully`,
        description: "",
        status: "success",
        duration: 4500,
        isClosable: true,
      });
      router.push("/recipes");
    } catch (error) {
      toast({
        title: `Failed to add ${recipeName}: ${error}`,
        description: "",
        status: "error",
        duration: 4500,
        isClosable: true,
      });
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
    rules: {
      required: "Must have atleast one ingedient",
    },
  });

  const {
    fields: methodFields,
    append: methodAppend,
    remove: methodRemove,
  } = useFieldArray({
    control,
    name: "method",
    rules: {
      required: "Must have atleast one step",
    },
  });

  return (
    <Container maxW="2xl" mb={15}>
      <Heading w="100%" textAlign={"left"} fontWeight="normal" mt="2%" mb="2%">
        New Recipe
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <ImageUpload onUpload={(url) => setValue("imgUrl", url)} />
          <FormLabel htmlFor="recipeName">Recipe name:</FormLabel>
          <Input
            mb={15}
            maxLength={75}
            id="recipeName"
            placeholder="Egg on toast"
            {...register("recipeName", {
              required: "Recipe name is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <p>{errors.recipeName?.message}</p>

          {/* Duration / Serving size / Mealtype */}

          <Stack direction={["column", "row"]} justify={"space-between"}>
            <Stack direction={["row", "column"]} spacing={0}>
              <FormLabel htmlFor="recipeDuration">Duration:</FormLabel>
              <InputGroup size={["xs", "sm"]} mb={2} id="recipeDuration">
                <Input
                  type="number"
                  {...register("recipeDuration.hours", {
                    min: 0,
                    max: { value: 99, message: "Max length is 99 hours." },
                  })}
                />
                <InputRightAddon children="hours" borderRadius={0} />

                <Input
                  type="number"
                  {...register("recipeDuration.minutes", {
                    min: 0,
                    max: { value: 60, message: "Max length in minutes is 60." },
                  })}
                />
                <InputRightAddon children="min" />
              </InputGroup>
            </Stack>
            <p>{errors.recipeDuration?.message}</p>

            <Stack direction={["row", "column"]} spacing={0}>
              <FormLabel htmlFor="mealType">Meal:</FormLabel>
              <Select
                size={["xs", "sm"]}
                id="mealType"
                placeholder="Select option"
                w={150}
                {...register("mealType")}
              >
                {mealTypes.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </Select>
            </Stack>
            <Stack direction={["row", "column"]} spacing={0}>
              <FormLabel htmlFor="servings">Servings:</FormLabel>
              <Controller
                name="servings"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    size="sm"
                    id="servings"
                    max={15}
                    min={1}
                    defaultValue={2}
                    w={20}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
            </Stack>
          </Stack>

          <FormLabel htmlFor="description">Description:</FormLabel>
          <Textarea
            placeholder="A delicious breakfast"
            id="description"
            resize={"none"}
            maxLength={200}
            {...register("description")}
          />
          {/* Ingredients */}
          <FormLabel htmlFor="ingredients" mt={5}>
            Ingredients:
          </FormLabel>
          {/* use array split and join to manage the ingredients + unit for later processing (conversion) */}
          {fields.map((field, index) => {
            return (
              <InputGroup mb={2} id="ingredients" key={field.id}>
                <VisuallyHidden>
                  <FormLabel htmlFor="amount">Ingredient Amount</FormLabel>
                </VisuallyHidden>
                <Input
                  id="amount"
                  placeholder="amount"
                  maxLength={25}
                  {...register(`ingredients.${index}.amount`)}
                  // placeholder="amount"
                  borderRightRadius="0"
                ></Input>

                <VisuallyHidden>
                  <FormLabel htmlFor="name">Ingredient name</FormLabel>
                </VisuallyHidden>
                <Input
                  id="name"
                  maxLength={25}
                  {...register(`ingredients.${index}.name`)}
                  placeholder="name"
                  borderLeftRadius="0"
                ></Input>

                <Button
                  ml={2}
                  onClick={() => remove(index)}
                  bg={redTheme}
                  color={"white"}
                >
                  -
                </Button>
              </InputGroup>
            );
          })}
          <Flex>
            <Spacer />
            <Button
              onClick={() => append({ amount: "", unit: "", name: "" })}
              bg={greenTheme}
              color={"white"}
              w={buttonWidth}
            >
              +
            </Button>
          </Flex>
          {/* Method */}
          <FormLabel>Method:</FormLabel>
          {methodFields.map((field, index) => {
            return (
              <InputGroup key={field.id}>
                <Flex
                  w={"100px"}
                  h={stepHeight}
                  bg={["gray.100", "gray.400"]}
                  borderLeftRadius={5}
                  justify={"center"}
                  align={"center"}
                >
                  <FormLabel m={0}>{index + 1}</FormLabel>
                </Flex>

                <Textarea
                  mb={2}
                  type="text"
                  rows="5"
                  resize={"none"}
                  maxLength={200}
                  h={stepHeight}
                  {...register(`method.${index}.step`)}
                  borderRadius="0"
                />
                <Button
                  borderLeftRadius="0"
                  h={stepHeight}
                  w={buttonWidth}
                  onClick={() => methodRemove(index)}
                  bg={redTheme}
                  color={"white"}
                >
                  -
                </Button>
              </InputGroup>
            );
          })}
          <Flex>
            <Spacer />
            <Button
              onClick={() => methodAppend()}
              bg={greenTheme}
              color={"white"}
              w={buttonWidth}
            >
              +
            </Button>
          </Flex>

          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <Flex>
            <Spacer />
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="whatsapp"
              size={"lg"}
              minW={"120px"}
            >
              Save recipe
            </Button>
            <Spacer />
          </Flex>
        </FormControl>
      </form>
    </Container>
  );
}
