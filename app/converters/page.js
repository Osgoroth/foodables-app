"use client";

import {
  Container,
  Heading,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureLow,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";

import TemperatureConverter from "@/components/tools/TemperatureConverter";
import MassConverter from "@/components/tools/MassConverter";

export default function Converters() {
  return (
    <Container>
      <Heading>Converters</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab> Temperature</Tab>
          <Tab>Mass</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TemperatureConverter />
          </TabPanel>
          <TabPanel>
            <MassConverter />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
