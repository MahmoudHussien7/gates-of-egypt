"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

// Import your logo
import Logo from "../../public/LOGO 2.svg";

const Footer = () => {
  const goldColor = "#D2AC71"; // Gold color for button and accents

  return (
    <Box py={10} mt="auto">
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          gap={{ base: 8, md: 0 }}
        >
          {/* Left Section: Logo, Text, Button, Links */}
          <Box
            textAlign={{ base: "center", md: "left" }}
            display="flex"
            flexDirection="column"
            gap={4}
            maxW={{ base: "full", md: "60%" }}
          >
            {/* Logo */}
            <Box mb={2}>
              {/* Replace with your actual logo import */}
              <Text
                fontSize="6xl"
                fontWeight="bold"
                color={goldColor}
                fontFamily="serif"
                letterSpacing="wider"
              ></Text>
              <Logo alt="Logo" width={184} height={60} />
            </Box>

            <Text
              fontSize={{ base: "2xl", md: "36px" }}
              fontWeight="600"
              lineHeight="100%"
              letterSpacing="0%"
              color="white"
              maxW="400px"
            >
              Lorem, Ipsum Lorem, Ipsum Lorem, Ipsum or less.
            </Text>

            {/* Discover More Button with Glow */}
            <Button
              bg={goldColor}
              color="white"
              _hover={{ bg: "yellow.400" }}
              w={{ base: "100%", md: "fit-content" }}
              borderRadius="full"
              width="200px"
              height="45px"
            >
              Discover More
            </Button>

            {/* Navigation Links */}
            <Flex
              gap={4}
              justify={{ base: "center", md: "flex-start" }}
              wrap="wrap"
              mt={2}
            >
              {["Home", "EgyBook", "EgyExplore", "EgyTales", "EgyTreasure"].map(
                (link) => (
                  <Link key={link} href={`/${link.toLowerCase()}`} passHref>
                    <Box
                      fontSize="sm"
                      fontWeight="medium"
                      color={"white"}
                      _hover={{ color: "white" }}
                    >
                      {link.startsWith("Egy") ? (
                        <>
                          <Text as="span" color={goldColor}>
                            Egy
                          </Text>
                          {link.replace("Egy", "")}
                        </>
                      ) : (
                        link
                      )}
                    </Box>
                  </Link>
                )
              )}
            </Flex>
          </Box>

          {/* Right Section: Social Icons and Copyright */}
          <Box
            textAlign={{ base: "center", md: "right" }}
            mt={{ base: 6, md: 0 }}
            alignSelf={{ base: "center", md: "flex-end" }}
          >
            {/* Social Media Icons */}
            <Flex gap={3} justify={{ base: "center", md: "flex-end" }} mb={4}>
              {[
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaFacebookF, href: "https://facebook.com" },
                { icon: FaTiktok, href: "https://tiktok.com" },
                { icon: FaXTwitter, href: "https://x.com" },
                { icon: FaLinkedinIn, href: "https://linkedin.com" },
              ].map(({ icon, href }, index) => (
                <ChakraLink key={index} href={href} isExternal>
                  <Box
                    bg={goldColor}
                    borderRadius="md"
                    p={2}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ bg: "yellow.400" }}
                  >
                    <Icon as={icon} color="white" boxSize={5} />
                  </Box>
                </ChakraLink>
              ))}
            </Flex>

            {/* Copyright Notice */}
            <Text fontSize={{ base: "xs", md: "sm" }} color="white">
              Copyright Gates of Egypt © 2024
              <br />
              All rights reserved
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
