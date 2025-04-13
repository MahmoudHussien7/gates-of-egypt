"use client";

import { useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  Container,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import redSea from "../../public/red-sea.png";
import somaBay from "../../public/soma-bay.png";
import nile from "../../public/nile.png";
import cairo from "../../public/cairo.png";
import nabq from "../../public/nabq.png";
import giza from "../../public/giza.png";
type Destination = {
  id: number;
  name: string;
  image: StaticImageData;
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "Red Sea",
    image: redSea,
  },
  {
    id: 2,
    name: "Soma Bay",
    image: somaBay,
  },
  {
    id: 3,
    name: "Giza",
    image: giza,
  },
  {
    id: 4,
    name: "Nile",
    image: nile,
  },
  {
    id: 5,
    name: "Nabq Bay",
    image: nabq,
  },
  {
    id: 6,
    name: "Other",
    image: cairo,
  },
];

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <Box
      position="relative"
      height={{ base: "200px", md: "220px" }}
      width={{ base: "160px", md: "180px" }}
      borderRadius="xl"
      overflow="hidden"
      flexShrink={0}
      cursor="pointer"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.03)" }}
    >
      {/* Image */}
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 160px, 180px"
      />

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="50%"
        bgGradient="linear(to-t, rgba(0,0,0,0.7), rgba(0,0,0,0))"
      />

      {/* Destination */}
      <Text
        position="absolute"
        bottom={4}
        left={0}
        right={0}
        textAlign="center"
        color="white"
        fontWeight="medium"
        fontSize="lg"
      >
        {destination.name}
      </Text>
    </Box>
  );
};

export default function DiscoverPlacesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200;

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <Box py={8} width="full">
      <Container maxW="container.xl">
        <Heading
          as="h2"
          color="white"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mb={6}
        >
          Discover New Places
        </Heading>

        <Box position="relative">
          {/* Left Navigation Arrow */}
          <IconButton
            aria-label="Scroll left"
            icon={<FaChevronLeft />}
            position="absolute"
            left={-5}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            size="sm"
            bg="white"
            _hover={{ bg: "gray.100" }}
            onClick={() => scroll("left")}
          />

          {/* Carousel Container */}
          <Flex
            ref={scrollRef}
            overflowX="auto"
            py={4}
            gap={3}
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </Flex>

          {/* Right Navigation Arrow */}
          <IconButton
            aria-label="Scroll right"
            icon={<FaChevronRight />}
            position="absolute"
            right={-5}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            size="sm"
            bg="white"
            _hover={{ bg: "gray.100" }}
            onClick={() => scroll("right")}
          />
        </Box>
      </Container>
    </Box>
  );
}
