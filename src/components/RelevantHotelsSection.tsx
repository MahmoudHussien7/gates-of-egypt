"use client";

import { useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  Container,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

import hotel1 from "../../public/hotel1.png";
import hotel2 from "../../public/hotel2.png";
import hotel3 from "../../public/hotel3.png";

type HotelCardProps = {
  id: number;
  image: StaticImageData;
  location: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
};

const hotels: HotelCardProps[] = [
  {
    id: 1,
    image: hotel1,
    location: "Soma Bay",
    name: "Kempinski Hotel Soma Bay",
    rating: 4.7,
    reviews: 1274,
    price: 214,
  },
  {
    id: 2,
    image: hotel2,
    location: "Cairo",
    name: "JW Marriott Hotel Cairo",
    rating: 4.6,
    reviews: 2274,
    price: 194,
  },
  {
    id: 3,
    image: hotel3,
    location: "Soma Bay",
    name: "Kempinski Hotel Soma Bay",
    rating: 4.7,
    reviews: 1274,
    price: 214,
  },
];

const HotelCard = ({ hotel }: { hotel: HotelCardProps }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      mx={2}
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-8px)" }}
      flexShrink={0}
      boxShadow="lg"
    >
      {/* Image Section */}
      <Box position="relative" height="270px" width="450px">
        <Box
          position="relative"
          height="260px"
          width="100%"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="sm"
        >
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 300px"
          />

          <Badge
            position="absolute"
            top={3}
            left={3}
            bg="white"
            color="gray.800"
            fontSize="xs"
            fontWeight="medium"
            py={1}
            px={3}
            borderRadius="full"
            boxShadow="md"
          >
            {hotel.location}
          </Badge>

          <IconButton
            aria-label="Favorite"
            icon={<FaHeart size={16} />}
            position="absolute"
            top={3}
            right={3}
            borderRadius="full"
            size="sm"
            bg="white"
            color={isFavorite ? "red.500" : "gray.300"}
            _hover={{ bg: "white" }}
            onClick={() => setIsFavorite(!isFavorite)}
          />
        </Box>
      </Box>

      {/* Info Section */}
      <Box p={4} pt={2}>
        <Flex justify="space-between" align="center">
          <Heading
            as="h3"
            fontSize="md"
            fontWeight="bold"
            noOfLines={1}
            mb={2}
            color="gray.800"
          >
            {hotel.name}
          </Heading>
          <HStack spacing={1}>
            <FaStar color="brand.500" size={14} />
            <Text fontSize="sm" fontWeight="semibold" color="gray.700">
              {hotel.rating}{" "}
              <Text as="span" fontWeight="normal" color="gray.500">
                ({hotel.reviews.toLocaleString()})
              </Text>
            </Text>
          </HStack>
        </Flex>

        <Text fontWeight="medium" fontSize="sm" color="gray.700">
          From{" "}
          <Text as="span" color="black" fontWeight="bold">
            ${hotel.price}
          </Text>{" "}
          per person
        </Text>
      </Box>
    </Box>
  );
};

export default function RelevantHotelsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box py={10} w="full">
      <Container maxW="container.xl">
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="white"
          mb={6}
        >
          The Most Relevant
        </Heading>

        <Box position="relative">
          <IconButton
            aria-label="Scroll Left"
            icon={<FaChevronLeft color="brand.500" />}
            position="absolute"
            left={-4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            size="sm"
            borderRadius="full"
            bg="white"
            _hover={{ bg: "gray.100" }}
            onClick={() => scroll("left")}
          />

          <Flex
            ref={scrollRef}
            overflowX="auto"
            py={4}
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </Flex>

          <IconButton
            aria-label="Scroll Right"
            icon={<FaChevronRight color="brand.500" />}
            position="absolute"
            right={-4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            size="sm"
            borderRadius="full"
            bg="white"
            _hover={{ bg: "gray.100" }}
            onClick={() => scroll("right")}
          />
        </Box>
      </Container>
    </Box>
  );
}
