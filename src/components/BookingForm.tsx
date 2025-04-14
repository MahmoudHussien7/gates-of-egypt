// components/BookingForm.js
import { useState } from "react";
import {
  Flex,
  Icon,
  Text,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  IconButton,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import default styles for DayPicker
import { format } from "date-fns";

const BookingForm = () => {
  // State for Location
  const [location, setLocation] = useState("Cairo, Egypt");
  const {
    isOpen: isLocationOpen,
    onOpen: onLocationOpen,
    onClose: onLocationClose,
  } = useDisclosure();
  const locations = [
    "Cairo, Egypt",
    "Hurghada, Egypt",
    "Sharm El-Sheikh, Egypt",
    "Alexandria, Egypt",
    "Luxor, Egypt",
    "Aswan, Egypt",
  ];

  // State for Dates
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 2, 19), // 19 March 2025
    to: new Date(2025, 2, 27), // 27 March 2025
  });
  const {
    isOpen: isDateOpen,
    onOpen: onDateOpen,
    onClose: onDateClose,
  } = useDisclosure();

  // State for Guests
  const [guests, setGuests] = useState({
    adults: 2,
    children: 1,
    infants: 1,
    rooms: 1,
  });
  const {
    isOpen: isGuestsOpen,
    onOpen: onGuestsOpen,
    onClose: onGuestsClose,
  } = useDisclosure();

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange.from) return "Select Dates";
    if (!dateRange.to) return `${format(dateRange.from, "d MMMM yyyy")} - ...`;
    return `${format(dateRange.from, "d MMMM yyyy")} - ${format(
      dateRange.to,
      "d MMMM yyyy"
    )}`;
  };

  // Handle guest changes
  const handleGuestChange = (
    type: keyof typeof guests,
    operation: "increment" | "decrement"
  ) => {
    setGuests((prev) => ({
      ...prev,
      [type]:
        operation === "increment"
          ? prev[type] + 1
          : Math.max(0, prev[type] - 1),
    }));
  };

  return (
    <Box className="bg-gray-900 text-white p-4">
      <Flex
        className="bg-gray-800 rounded-lg shadow-lg"
        direction={{ base: "column", md: "row" }}
        align="center"
      >
        {/* Location */}
        <Flex
          px={5}
          py={4}
          align="center"
          flex="1.5"
          borderRight={{ md: "1px solid" }}
          borderTop={{ base: "1px solid", md: "none" }}
          borderColor="whiteAlpha.300"
          onClick={onLocationOpen}
          cursor="pointer"
          _hover={{ bg: "gray.700" }}
        >
          <Icon as={FaMapMarkerAlt} color="brand.500" mr={2} />
          <Text color="white">{location}</Text>
        </Flex>

        {/* Dates */}
        <Flex
          px={5}
          py={4}
          align="center"
          flex="2"
          borderRight={{ md: "1px solid" }}
          borderTop={{ base: "1px solid", md: "none" }}
          borderColor="whiteAlpha.300"
          onClick={onDateOpen}
          cursor="pointer"
          _hover={{ bg: "gray.700" }}
        >
          <Icon as={FaCalendarAlt} color="brand.500" mr={2} />
          <Text color="white">{formatDateRange()}</Text>
        </Flex>

        {/* Guests */}
        <Flex
          px={5}
          py={4}
          align="center"
          flex="1.5"
          borderRight={{ md: "1px solid" }}
          borderTop={{ base: "1px solid", md: "none" }}
          borderColor="whiteAlpha.300"
          onClick={onGuestsOpen}
          cursor="pointer"
          _hover={{ bg: "gray.700" }}
        >
          <Icon as={FaUsers} color="brand.500" mr={2} />
          <Text color="white">{`${guests.adults} Adults, ${guests.children} Child, ${guests.infants} Infant, ${guests.rooms} Room`}</Text>
        </Flex>

        {/* Button */}
        <Box py={{ base: 4, md: 0 }} px={4} textAlign="center" flexShrink={0}>
          <Button
            bg="#346d52"
            color="white"
            size="lg"
            borderRadius="full"
            _hover={{ bg: "teal.500" }}
          >
            Explore Stays
          </Button>
        </Box>
      </Flex>

      {/* Location Modal */}
      <Modal isOpen={isLocationOpen} onClose={onLocationClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Location Picker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                bg="gray.700"
                color="white"
                borderColor="gray.600"
              >
                {locations.map((loc) => (
                  <option
                    key={loc}
                    value={loc}
                    className="bg-gray-700 text-white"
                  >
                    {loc}
                  </option>
                ))}
              </Select>
              <Button
                bg="#346d52"
                color="white"
                w="full"
                onClick={onLocationClose}
                _hover={{ bg: "teal.500" }}
              >
                Confirm Location
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Date Picker Modal */}
      <Modal isOpen={isDateOpen} onClose={onDateClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Date Picker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={(range) =>
                setDateRange({
                  from: range?.from || new Date(),
                  to: range?.to || new Date(),
                })
              }
              defaultMonth={new Date(2025, 2)} // March 2025
              numberOfMonths={2}
              className="text-white"
              styles={{
                caption: { color: "white" },
                day: { color: "white" },
                head: { color: "white" },
                table: { backgroundColor: "gray.700", borderRadius: "8px" },
              }}
            />
            <Button
              bg="#346d52"
              color="white"
              w="full"
              mt={4}
              onClick={onDateClose}
              _hover={{ bg: "teal.500" }}
            >
              Confirm Dates
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Guests/Rooms Modal */}
      <Modal isOpen={isGuestsOpen} onClose={onGuestsClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Guests & Rooms Picker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="full">
                <Text>Adults</Text>
                <HStack>
                  <IconButton
                    aria-label="Decrease adults"
                    icon={<FaMinus />}
                    onClick={() => handleGuestChange("adults", "decrement")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                  />
                  <Text>{guests.adults}</Text>
                  <IconButton
                    aria-label="Increase adults"
                    icon={<FaPlus />}
                    onClick={() => handleGuestChange("adults", "increment")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                  />
                </HStack>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text>Children</Text>
                <HStack>
                  <IconButton
                    aria-label="Decreasing childs"
                    icon={<FaMinus />}
                    onClick={() => handleGuestChange("children", "decrement")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                  />
                  <Text>{guests.children}</Text>
                  <IconButton
                    aria-label="increasing childs"
                    icon={<FaPlus />}
                    onClick={() => handleGuestChange("children", "increment")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                  />
                </HStack>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text>Infants</Text>
                <HStack>
                  <IconButton
                    icon={<FaMinus />}
                    onClick={() => handleGuestChange("infants", "decrement")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                    aria-label={""}
                  />
                  <Text>{guests.infants}</Text>
                  <IconButton
                    icon={<FaPlus />}
                    onClick={() => handleGuestChange("infants", "increment")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                    aria-label={""}
                  />
                </HStack>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text>Rooms</Text>
                <HStack>
                  <IconButton
                    icon={<FaMinus />}
                    onClick={() => handleGuestChange("rooms", "decrement")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                    aria-label={""}
                  />
                  <Text>{guests.rooms}</Text>
                  <IconButton
                    icon={<FaPlus />}
                    onClick={() => handleGuestChange("rooms", "increment")}
                    size="sm"
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                    aria-label={""}
                  />
                </HStack>
              </HStack>
              <Text fontSize="xs">You can search for up to 70 travelers</Text>
              <Button
                bg="#346d52"
                color="white"
                w="full"
                onClick={onGuestsClose}
                _hover={{ bg: "teal.500" }}
              >
                Confirm Guests & Rooms
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookingForm;
