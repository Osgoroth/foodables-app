import {
  Heading,
  InputGroup,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useState } from "react";

import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { celsiusToFahrenheit, fahrenheitToCelsius } from "./converters";

export default function TemperatureConverter() {
  const [temp, setTemp] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <Card w={256}>
      <CardHeader>
        <Heading size={"sm"}>
          {isCelsius ? "Celsius to Fahrenheit" : "Fahrenheit to Celsius"}:
        </Heading>
      </CardHeader>
      <CardBody>
        <InputGroup>
          <NumberInput
            defaultValue={0}
            value={temp}
            min={0}
            max={9999}
            precision={2}
            onChange={(e) => {
              setTemp(e);
            }}
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
            onClick={() => setIsCelsius(!isCelsius)}
          >
            {isCelsius ? <RiCelsiusFill /> : <RiFahrenheitFill />}
          </InputRightAddon>
        </InputGroup>
      </CardBody>
      <CardFooter>
        <Text>
          {isCelsius
            ? celsiusToFahrenheit(temp) + "F"
            : fahrenheitToCelsius(temp) + "C"}
        </Text>
      </CardFooter>
    </Card>
  );
}
