import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import BookingIcon from "@/assets/mouseClick.svg"; // Updated path and filename
import DealsIcon from "@/assets/biggy.svg"; // Updated path and filename
import VrIcon from "@/assets/vr.svg"; // Updated path and filename

const WhyChooseEgyBook = () => {
  return (
    <Box py={16} px={4}>
      <Container maxW="7xl">
        <Text
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="white"
          mb={6}
        >
          Why choose{" "}
          <Text as="span" color="#d2ac71">
            Egy
          </Text>
          Book?
        </Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="flex-start"
          gap={8}
        >
          {/* 1. Booking */}
          <VStack align="flex-start" spacing={3} maxW="sm">
            <BookingIcon style={{ width: "53px", height: "59px" }} />
            <Text fontWeight="bold" color="white">
              <Text as="span" color="#d2ac71">
                Seamless
              </Text>{" "}
              &{" "}
              <Text as="span" color="gray.300">
                Smart
              </Text>{" "}
              Booking
            </Text>
            <Text color="gray.400" fontSize="sm">
              Quick, user-friendly platform that simplifies the reservation
              process
            </Text>
          </VStack>

          {/* 2. VR */}
          <VStack align="flex-start" spacing={3} maxW="sm">
            <VrIcon style={{ width: "62px", height: "px" }} />
            <Text fontSize="sm" fontWeight="bold" color="white">
              VR
            </Text>
            <Text fontWeight="bold" color="white">
              <Text as="span" fontStyle="italic" color="#42b883">
                Immersive
              </Text>{" "}
              VR Previews
            </Text>
            <Text color="gray.400" fontSize="sm">
              Explore hotels and rooms in 360° before you book—giving you total
              confidence.
            </Text>
          </VStack>

          {/* 3. Deals */}
          <VStack align="flex-start" spacing={3} maxW="sm">
            <DealsIcon style={{ width: "64px", height: "64px" }} />
            <Text fontWeight="bold" color="white">
              <Text as="span" color="teal.300">
                Exclusive
              </Text>{" "}
              Best-Price Deals
            </Text>
            <Text color="gray.400" fontSize="sm">
              Save more with special offers and real-time price comparisons.
            </Text>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default WhyChooseEgyBook;
