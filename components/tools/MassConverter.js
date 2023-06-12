import { use, useState } from "react";
import { poundsToKilograms, kilogramsToPounds } from "./converters";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

export default function MassConverter() {
  const [mass, setMass] = useState(0);
  const [isKilograms, setIsKilograms] = useState(true);

  return (
    <>
      <Card w={256}>
        <CardHeader>
          <Heading size={"sm"}>
            {isKilograms ? "Kilograms to Pounds" : "Pounds to Kilograms"}
          </Heading>
        </CardHeader>
        <CardBody>
          <InputGroup>
            <NumberInput
              min={0}
              max={9999}
              precision={2}
              defaultValue={0}
              value={mass}
              onChange={(e) => setMass(e)}
            >
              <NumberInputField borderRightRadius="none" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon
              as={"button"}
              w={50}
              onClick={() => setIsKilograms(!isKilograms)}
            >
              {isKilograms ? "kg" : "lb"}
            </InputRightAddon>
          </InputGroup>
        </CardBody>
        <CardFooter>
          <Text>
            {isKilograms
              ? kilogramsToPounds(mass) + "lb"
              : poundsToKilograms(mass) + "kg"}
          </Text>
        </CardFooter>
      </Card>
    </>
  );
}
