"use client";

import { useRef, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  Container,
  Button,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import cairoImage from "../../public/Mask group.png";
import hurghadaImage from "../../public/giza.png";
import sharmImage from "../../public/hotel2.png";
import luxorImage from "../../public/Luxor.png";

import { StaticImageData } from "next/image";

type DestinationCardProps = {
  image: string | StaticImageData;
  title: string;
  description: string;
};

const destinations: DestinationCardProps[] = [
  {
    image: cairoImage,
    title: "Cairo",
    description: "Unveil secrets of ancient wonders.",
  },
  {
    image: hurghadaImage,
    title: "Hurghada",
    description: "Sunshine, beaches, and vibrant reefs.",
  },
  {
    image: sharmImage,
    title: "Sharm",
    description: "Dive into breathtaking underwater.",
  },
  {
    image: luxorImage,
    title: "Luxor",
    description: "Explore the land of the Pharaohs.",
  },
];

const DestinationCard = ({
  destination,
}: {
  destination: DestinationCardProps;
}) => {
  const getGradient = (title: string) => {
    switch (title) {
      case "Cairo":
        return "linear(to-r, rgba(154, 72, 6, 0.85), transparent)";
      case "Hurghada":
        return "linear(to-r, rgba(0, 102, 204, 0.84), transparent)";
      case "Sharm":
        return "linear(to-r, rgba(195, 27, 27, 0.76), transparent)";
      default:
        return "linear(to-r, rgba(0, 0, 0, 0.5), transparent)";
    }
  };

  return (
    <Box
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      mx={2}
      flexShrink={0}
      width={{ base: "100%", sm: "90%", md: "400px" }} // Responsive width
      aspectRatio={4 / 3}
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Box position="relative" width="100%" height="100%">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          style={{ objectFit: "cover" }}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgGradient={getGradient(destination.title)}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgGradient="linear(to-t, rgba(0,0,0,0.5), transparent)"
        />
      </Box>

      {/* Title and Description (Top-Left) */}
      <Box position="absolute" top={5} left={4} right={4} color="white">
        <Text fontWeight={600} fontSize={{ base: "24px", md: "48px" }}>
          {destination.title}
        </Text>
        <Text
          fontSize={{ base: "16px", md: "26px" }}
          fontWeight={600}
          lineHeight="32px"
          mb={3}
        >
          {destination.description}
        </Text>
      </Box>

      {/* Button (Bottom-Left) */}
      <Box position="absolute" bottom={4} left={4} color="white">
        <Link href={`/hotels?destination=${destination.title.toLowerCase()}`}>
          <Button
            size="sm"
            bg="white"
            color="gray.800"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
            fontSize={{ base: "14px", md: "16px" }} // Responsive font size
          >
            See Hotels
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default function TrendingDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth =
        scrollRef.current.querySelector("div > div")?.clientWidth || 400; // Get the width of the first card
      const scrollAmount = cardWidth + 16; // Card width + gap (16px from gap={4})
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1); // -1 to account for rounding
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

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
          Trending Destinations
        </Heading>

        <Box position="relative">
          {canScrollLeft && (
            <IconButton
              aria-label="Scroll Left"
              icon={<FaChevronLeft color="#d2ac71" />}
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
              display={{ base: "none", md: "inline-flex" }}
            />
          )}

          <Box position="relative" overflow="hidden">
            <Flex
              ref={scrollRef}
              overflowX="auto"
              py={4}
              css={{
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
              gap={4}
            >
              {destinations.map((destination, index) => (
                <DestinationCard key={index} destination={destination} />
              ))}
            </Flex>

            <Box
              position="absolute"
              top={0}
              right={0}
              width="100px"
              height="100%"
              bgGradient="linear(to-r, transparent, black)"
              pointerEvents="none"
              zIndex={1}
            />
          </Box>

          {canScrollRight && (
            <IconButton
              aria-label="Scroll Right"
              icon={<FaChevronRight color="#d2ac71" />}
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
              display={{ base: "none", md: "inline-flex" }}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}
