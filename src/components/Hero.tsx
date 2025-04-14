// components/Hero.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  VStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaMinus,
  FaPlus,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";
import { format } from "date-fns";
import heroImg from "../../public/HeroBG.png";
import ChakraCalendar from "./ChakraCalender";

// Motion props for MenuList animation
const menuMotionProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

export default function Hero() {
  // State for location
  const [location, setLocation] = useState("Cairo, Egypt");

  // State for date range
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 2, 19),
    to: new Date(2025, 2, 27),
  });

  // State for guests
  const [guests, setGuests] = useState({ adults: 2, children: 1, rooms: 1 });

  // Disclosure hooks for controlling menus
  const {
    isOpen: isLocationOpen,
    onToggle: onLocationToggle,
    onClose: onLocationClose,
  } = useDisclosure();
  const {
    isOpen: isDateOpen,
    onToggle: onDateToggle,
    onClose: onDateClose,
  } = useDisclosure();
  const {
    isOpen: isGuestsOpen,
    onToggle: onGuestsToggle,
    onClose: onGuestsClose,
  } = useDisclosure();

  // Available locations
  const locations = [
    "Cairo, Egypt",
    "Hurghada, Egypt",
    "Sharm El-Sheikh, Egypt",
  ];

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange.from) return "Select Dates";
    if (!dateRange.to) return `${format(dateRange.from, "d MMM yyyy")} - ...`;
    return `${format(dateRange.from, "d MMM yyyy")} - ${format(
      dateRange.to,
      "d MMM yyyy"
    )}`;
  };

  // Handle date selection
  const handleDateSelect = (range) => {
    setDateRange(range);
    if (range?.to) {
      onDateClose();
    }
  };

  // Handle guest count changes
  const handleGuestChange = (type, operation) => {
    setGuests((prev) => ({
      ...prev,
      [type]:
        operation === "increment"
          ? prev[type] + 1
          : Math.max(type === "rooms" ? 1 : 0, prev[type] - 1),
    }));
  };

  return (
    <Box position="relative" height={{ base: "100vh", md: "600px" }}>
      {/* Background Image */}
      <Box position="absolute" inset={0}>
        <Image
          src={heroImg || "/placeholder.svg"}
          alt="Luxury Egyptian hotel room with pyramids view"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <Box bg="blackAlpha.700" position="absolute" inset={0} />
      </Box>

      {/* Foreground Content */}
      <Container
        maxW="container.xl"
        height="full"
        position="relative"
        zIndex={2}
      >
        <Flex direction="column" justify="center" height="full" py={10}>
          {/* Location Indicator */}
          <HStack spacing={2} mb={3}>
            <Icon as={FaMapMarkerAlt} color="white" />
            <Text color="white" fontWeight="medium">
              Egypt
            </Text>
          </HStack>

          {/* Headings */}
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            color="white"
            mb={2}
          >
            Hey, Bishoy!
          </Heading>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl" }}
            color="white"
            mb={4}
          >
            Tell us where you want to stay
          </Heading>
          <Text color="white" fontSize="lg" mb={8}>
            Book 450+ Curated Egyptian Hotels
          </Text>

          {/* Search Bar */}
          <Flex
            bg="#FFFFFF26"
            backdropFilter="blur(10px)"
            borderRadius="full"
            direction={{ base: "column", md: "row" }}
            align="center"
            py={2}
            px={4}
            position="relative"
          >
            {/* Location Picker */}
            <Menu
              isOpen={isLocationOpen}
              onClose={onLocationClose}
              placement="bottom"
            >
              <MenuButton
                as={Box}
                px={4}
                py={3}
                flex="1.5"
                borderRight={{ md: "1px solid" }}
                borderColor="gray.700"
                cursor="pointer"
                onClick={onLocationToggle}
                transition="background-color 0.3s ease"
              >
                <Flex align="center">
                  <Box
                    bg="yellow.500"
                    p={2}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={3}
                  >
                    <Icon as={FaMapMarkerAlt} color="black" boxSize={4} />
                  </Box>
                  <Text color="#F6EEE5">{location}</Text>
                  <Icon
                    as={FaChevronDown}
                    ml={2}
                    color="white"
                    transform={
                      isLocationOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }
                    transition="transform 0.3s ease"
                  />
                </Flex>
              </MenuButton>

              <MenuList
                bg="#FFFFFF40"
                blur="10px"
                color="#F6EEE5"
                borderRadius="xl"
                border="none"
                p={2}
                minW="250px"
                zIndex={10}
                motionProps={menuMotionProps}
              >
                <VStack align="stretch" spacing={1}>
                  {locations.map((loc) => (
                    <Flex
                      key={loc}
                      p={3}
                      direction="column"
                      borderRadius="md"
                      _hover={{ bg: "#FFFFFF40" }}
                      bg={loc === location ? "#FFFFFF1A" : "transparent"}
                      cursor="pointer"
                      onClick={() => {
                        setLocation(loc);
                        onLocationClose();
                      }}
                    >
                      <Flex align="center">
                        <Box
                          bg="#F6EEE5"
                          p={3}
                          borderRadius="xl"
                          display="flex"
                          alignItems="start"
                          justifyContent="center"
                          mr={5}
                        >
                          <Icon as={FaMapMarkerAlt} color="black" boxSize={4} />
                        </Box>
                        <Flex direction="column">
                          <Text fontSize="md">{loc.split(",")[0]}</Text>
                          <Text fontSize="xs" color="gray.400">
                            City in Egypt
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
                </VStack>
              </MenuList>
            </Menu>

            {/* Calendar Picker */}
            <Menu
              isOpen={isDateOpen}
              onClose={onDateClose}
              placement="bottom-start"
            >
              <MenuButton
                as={Box}
                px={4}
                py={3}
                flex="2"
                borderRight={{ md: "1px solid" }}
                borderColor="gray.700"
                cursor="pointer"
                onClick={onDateToggle}
                transition="background-color 0.3s ease"
              >
                <Flex align="center">
                  <Box
                    bg="#D2AC71"
                    p={2}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={3}
                  >
                    <Icon as={FaCalendarAlt} color="black" boxSize={4} />
                  </Box>
                  <Text color="white">{formatDateRange()}</Text>
                  <Icon
                    as={FaChevronDown}
                    ml={2}
                    color="white"
                    transform={isDateOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    transition="transform 0.3s ease"
                  />
                </Flex>
              </MenuButton>

              <MenuList
                bg="#3C3C3C"
                color="white"
                borderRadius="xl"
                border="none"
                p={4}
                minW="650px"
                zIndex={10}
                boxShadow="lg"
                motionProps={menuMotionProps}
              >
                <Box p={4} borderRadius="lg">
                  {/* Chakra Calendar Component */}
                  <ChakraCalendar
                    initialMonth={1} // February
                    initialYear={2025}
                    selectedRange={dateRange}
                    onDateSelect={handleDateSelect}
                  />
                </Box>
              </MenuList>
            </Menu>

            {/* Guests Picker */}
            <Menu
              isOpen={isGuestsOpen}
              onClose={onGuestsClose}
              placement="bottom-start"
            >
              <MenuButton
                as={Box}
                px={4}
                py={3}
                flex="1.5"
                borderRight={{ md: "1px solid" }}
                cursor="pointer"
                onClick={onGuestsToggle}
                transition="background-color 0.3s ease"
              >
                <Flex align="center">
                  <Icon as={FaUsers} color="yellow.500" mr={3} />
                  <Text color="white">{`${guests.adults} Adults, ${guests.children} Child, ${guests.rooms} Room`}</Text>
                  <Icon
                    as={FaChevronDown}
                    ml={2}
                    color="white"
                    transform={isGuestsOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    transition="transform 0.3s ease"
                  />
                </Flex>
              </MenuButton>
              <MenuList
                bg="#FFFFFF40"
                blur={10}
                color="white"
                borderRadius="lg"
                border="none"
                p={4}
                minW="300px"
                zIndex={10}
                motionProps={menuMotionProps}
              >
                <VStack spacing={4}>
                  {["adults", "children", "rooms"].map((type) => (
                    <HStack
                      key={type}
                      justify="space-between"
                      w="full"
                      borderBottom="1px solid"
                      borderColor="#d2ac71"
                      pb={2}
                    >
                      <Text textTransform="capitalize">
                        {type === "adults"
                          ? "Adults"
                          : type === "children"
                          ? "Children"
                          : "Rooms"}
                      </Text>
                      <HStack>
                        <IconButton
                          icon={<FaMinus />}
                          onClick={() => handleGuestChange(type, "decrement")}
                          size="sm"
                          bg="transparent"
                          color="#d2ac71"
                          _hover={{ bg: "gray.500" }}
                          aria-label={`Decrease ${type}`}
                          border="1px solid"
                          borderRadius={"full"}
                        />
                        <Text>{guests[type]}</Text>
                        <IconButton
                          icon={<FaPlus />}
                          onClick={() => handleGuestChange(type, "increment")}
                          size="sm"
                          bg="transparent "
                          border="1px solid"
                          borderRadius={"full"}
                          color="#d2ac71"
                          _hover={{ bg: "gray.500" }}
                          aria-label={`Increase ${type}`}
                        />
                      </HStack>
                    </HStack>
                  ))}
                  <Text fontSize="xs" color="gray.400">
                    You can search for up to 70 travelers
                  </Text>
                </VStack>
              </MenuList>
            </Menu>

            {/* Explore Button */}
            <Box py={{ base: 4, md: 0 }} px={4} textAlign="center">
              <Button
                bg="#346D52"
                color="white"
                size="lg"
                borderRadius="full"
                _hover={{ bg: "#2F5D47" }}
              >
                Explore Stays
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
