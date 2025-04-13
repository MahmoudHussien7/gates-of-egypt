import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import iland from "../../public/p0ckmfkw.png";
const TravelBooking: NextPage = () => {
  const bgColor = useColorModeValue("#bfdbc9", "green.900");
  const buttonBgColor = useColorModeValue("#458465", "green.500");
  const buttonHoverBgColor = useColorModeValue("green.700", "green.600");

  return (
    <Box py={12} px={6}>
      <Container maxW="container.xl" p={0} overflow="hidden">
        <Flex
          direction={{ base: "column", md: "row" }}
          h={{ base: "auto", md: "400px" }}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="xl"
          my={8}
          className="travel-card"
        >
          {/* Left side content */}
          <Box
            w={{ base: "100%", md: "50%" }}
            bg={bgColor}
            p={8}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              mb={4}
              color="gray.800"
            >
              Ready to Book Your Next Adventure?
            </Heading>

            <Text fontSize={{ base: "md", lg: "lg" }} mb={6} color="gray.700">
              Get exclusive deals and immersive previews with our smart booking
              platform.
            </Text>

            <Button
              colorScheme="green"
              bg={buttonBgColor}
              _hover={{ bg: buttonHoverBgColor }}
              size="md"
              w="374px"
              borderRadius="full"
              color="white"
              fontWeight="medium"
              fontSize="md"
            >
              Book now
            </Button>
          </Box>

          {/* Right side image */}
          <Box w={{ base: "100%", md: "50%" }} position="relative">
            <div className="h-full w-full relative">
              <Image
                src={iland}
                alt="Luxury resort by the water"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default TravelBooking;
