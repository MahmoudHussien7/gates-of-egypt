"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  HStack,
  Container,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaSearch,
  FaGlobe,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [activeLink, setActiveLink] = useState("EgyBook");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef(null);

  const links = ["GOE", "EgyBook", "EgyExplore", "EgyTales", "EgyTreasure"];
  const locations = ["Cairo", "Alexandria", "Hurghada"];
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLinkClick = (link: string) => setActiveLink(link);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchActive(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSelect = (location: string) => {
    setSearchQuery(location);
    setIsSearchActive(false);
  };

  const handleSeeAllResults = () => {
    console.log(`See all results for: ${searchQuery}`);
    setIsSearchActive(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (searchRef.current && !(searchRef.current as any).contains(e.target)) {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSearchActive]);

  return (
    <Box bg="black" py={3} px={4} w="full">
      <Container maxW="7xl">
        <Flex justify="space-between" align="center" flexWrap="wrap">
          {/* Logo */}
          <Flex align="center" direction={"column"} gap={1} cursor="pointer">
            <Image src="/LOGO 2.png" alt="Logo" width={100} height={58} />
            <Text color="white" fontSize="lg" fontWeight="bold">
              <Text as="span" color="#d2ac71">
                Egy
              </Text>
              Book
            </Text>
          </Flex>

          {/* Navigation & Search (Desktop) */}
          {!isMobile ? (
            <HStack spacing={6} align="center" position="relative">
              {/* Expandable Search */}
              <Box ref={searchRef} position="relative">
                {!isSearchActive ? (
                  <Flex background="#44444440" rounded="full" px={1} py={1}>
                    <IconButton
                      icon={<FaSearch />}
                      aria-label="Search"
                      variant={"ghost"}
                      color="#d2ac71"
                      onClick={() => setIsSearchActive(true)}
                    />
                  </Flex>
                ) : (
                  <HStack
                    spacing={2}
                    border="1px solid"
                    borderColor="gray.600"
                    background="gray.800"
                    rounded="full"
                    px={3}
                    py={1}
                    w="200px"
                  >
                    <FaSearch color="#d2ac71" size={14} />
                    <Input
                      placeholder="Search..."
                      variant="unstyled"
                      color="white"
                      fontSize="sm"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoFocus
                    />
                  </HStack>
                )}

                {isSearchActive && (
                  <Box
                    position="absolute"
                    top="40px"
                    left={0}
                    bg="gray.800"
                    border="1px solid"
                    borderColor="gray.600"
                    borderRadius="md"
                    w="200px"
                    zIndex={10}
                    p={3}
                  >
                    <Text color="white" fontSize="sm" fontWeight="bold" mb={2}>
                      {searchQuery ? "Search Result" : "Most Popular"}
                    </Text>
                    {searchQuery ? (
                      <>
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((location) => (
                            <Flex
                              key={location}
                              align="center"
                              py={1}
                              cursor="pointer"
                              onClick={() => handleSearchSelect(location)}
                            >
                              <Flex
                                align="center"
                                justify="center"
                                bg="#f6eee5"
                                borderRadius="8px"
                                p={1}
                              >
                                <FaMapMarkerAlt color="black" size={14} />
                              </Flex>
                              <Text ml={2} color="white" fontSize="sm">
                                {location}
                              </Text>
                            </Flex>
                          ))
                        ) : (
                          <Text color="gray.400" fontSize="sm">
                            No results found
                          </Text>
                        )}
                        {filteredLocations.length > 0 && (
                          <Text
                            color="gray.400"
                            fontSize="sm"
                            mt={2}
                            cursor="pointer"
                            onClick={handleSeeAllResults}
                          >
                            See all results for &quot;{searchQuery}&quot;
                          </Text>
                        )}
                      </>
                    ) : (
                      <>
                        {locations.map((location) => (
                          <Flex
                            key={location}
                            align="center"
                            py={1}
                            cursor="pointer"
                            onClick={() => handleSearchSelect(location)}
                          >
                            <Flex
                              align="center"
                              justify="center"
                              bg="#f6eee5"
                              borderRadius="8px"
                              p={1}
                            >
                              <FaMapMarkerAlt color="black" size={14} />
                            </Flex>
                            <Text ml={2} color="white" fontSize="sm">
                              {location}
                            </Text>
                          </Flex>
                        ))}
                      </>
                    )}
                  </Box>
                )}
              </Box>

              {/* Links */}
              {links.map((link) => (
                <Link key={link} href="#">
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={activeLink === link ? "white" : "gray.400"}
                    _hover={{ color: "white" }}
                    transition="color 0.3s"
                    onClick={() => handleLinkClick(link)}
                  >
                    {link.startsWith("Egy") ? (
                      <>
                        <Text as="span" color="#d2ac71">
                          Egy
                        </Text>
                        {link.replace("Egy", "")}
                      </>
                    ) : (
                      link
                    )}
                  </Text>
                </Link>
              ))}
            </HStack>
          ) : (
            <IconButton
              aria-label="Menu"
              icon={<FaBars />}
              variant="ghost"
              color="#D2AC71"
              onClick={toggleMenu}
            />
          )}

          {/* Desktop User Actions */}
          {!isMobile && (
            <HStack spacing={4}>
              <HStack spacing={1} borderRight="1px solid #F6EEE5" pr={4}>
                <FaGlobe size={12} color="#e2e8f0" />
                <Text color="gray.300" fontSize="sm">
                  EN
                </Text>
              </HStack>

              {isSignedIn ? (
                <>
                  <IconButton
                    aria-label="Favorites"
                    icon={<FaHeart />}
                    variant="ghost"
                    color="gray.300"
                    _hover={{ bg: "#F6EEE5" }}
                    size="sm"
                  />
                  <IconButton
                    aria-label="Cart"
                    icon={<FaShoppingCart />}
                    variant="ghost"
                    color="gray.300"
                    _hover={{ bg: "#F6EEE5" }}
                    size="sm"
                  />
                  <Menu>
                    <MenuButton>
                      <FaUserCircle size={28} color="#F6EEE5" />
                    </MenuButton>
                    <MenuList
                      bg="#F6EEE5"
                      borderColor="#F6EEE5"
                      borderRadius="20px"
                      width="143px"
                    >
                      <MenuItem
                        bg="#F6EEE5"
                        color="gray.800"
                        borderRadius="20px"
                      >
                        My profile
                      </MenuItem>
                      <MenuItem
                        bg="#F6EEE5"
                        color="gray.800"
                        borderRadius="20px"
                      >
                        Saved bundles
                      </MenuItem>
                      <MenuItem
                        bg="#F6EEE5"
                        color="gray.800"
                        borderRadius="20px"
                      >
                        Invite friends
                      </MenuItem>
                      <MenuItem
                        bg="#F6EEE5"
                        color="gray.800"
                        borderRadius="20px"
                      >
                        Settings
                      </MenuItem>
                      <MenuItem
                        bg="#F6EEE5"
                        color="red.400"
                        onClick={() => setIsSignedIn(false)}
                        borderRadius="20px"
                      >
                        Log out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="yellow"
                    onClick={() => setIsSignedIn(true)}
                  >
                    Login
                  </Button>
                  <Button size="sm" bg="#d2ac71" color="black">
                    Sign Up
                  </Button>
                </>
              )}
            </HStack>
          )}

          {/* Mobile Menu */}
          {isMobile && isMenuOpen && (
            <Box
              position="fixed"
              top="0"
              left="0"
              bg="black"
              w="full"
              h="full"
              p={4}
              zIndex={20}
            >
              <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="lg" fontWeight="bold" color="white">
                  EgyBook
                </Text>
                <IconButton
                  aria-label="Close Menu"
                  icon={<FaTimes color="white" />}
                  variant="ghost"
                  colorScheme="#F6EEE5"
                  onClick={toggleMenu}
                />
              </Flex>

              <Box ref={searchRef}>
                {/* Expandable Search (Mobile) */}
                <Box mb={4}>
                  {!isSearchActive ? (
                    <Box
                      onClick={() => setIsSearchActive(true)}
                      transition="all 0.3s ease"
                    >
                      <FaSearch color="#F6EEE5" size={16} />
                    </Box>
                  ) : (
                    <Box position="relative">
                      <HStack
                        spacing={2}
                        border="1px solid"
                        borderColor="gray.600"
                        background="gray.800"
                        rounded="md"
                        px={3}
                        py={2}
                        transition="all 0.3s ease"
                      >
                        <FaSearch color="#d2ac71" size={16} />
                        <Input
                          placeholder="Search..."
                          variant="unstyled"
                          color="white"
                          fontSize="sm"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          autoFocus
                        />
                      </HStack>

                      {/* Search Dropdown (Mobile) */}
                      <Box
                        position="absolute"
                        top="50px"
                        left={0}
                        bg="gray.800"
                        border="1px solid"
                        borderColor="gray.600"
                        borderRadius="md"
                        w="full"
                        zIndex={10}
                        p={3}
                        transition="all 0.3s ease"
                      >
                        <Text
                          color="white"
                          fontSize="sm"
                          fontWeight="bold"
                          mb={2}
                        >
                          {searchQuery ? "Search Result" : "Most Popular"}
                        </Text>
                        {searchQuery ? (
                          <>
                            {filteredLocations.length > 0 ? (
                              filteredLocations.map((location) => (
                                <Flex
                                  key={location}
                                  align="center"
                                  py={1}
                                  cursor="pointer"
                                  onClick={() => handleSearchSelect(location)}
                                >
                                  <Flex
                                    align="center"
                                    justify="center"
                                    bg="#f6eee5"
                                    borderRadius="8px"
                                    p={1}
                                  >
                                    <FaMapMarkerAlt color="black" size={14} />
                                  </Flex>
                                  <Text ml={2} color="white" fontSize="sm">
                                    {location}
                                  </Text>
                                </Flex>
                              ))
                            ) : (
                              <Text color="gray.400" fontSize="sm">
                                No results found
                              </Text>
                            )}
                            {filteredLocations.length > 0 && (
                              <Text
                                color="gray.400"
                                fontSize="sm"
                                mt={2}
                                cursor="pointer"
                                onClick={handleSeeAllResults}
                              >
                                See all results for {searchQuery}
                              </Text>
                            )}
                          </>
                        ) : (
                          <>
                            {locations.map((location) => (
                              <Flex
                                key={location}
                                align="center"
                                py={1}
                                cursor="pointer"
                                onClick={() => handleSearchSelect(location)}
                              >
                                <Flex
                                  align="center"
                                  justify="center"
                                  bg="#f6eee5"
                                  borderRadius="8px"
                                  p={1}
                                >
                                  <FaMapMarkerAlt color="black" size={14} />
                                </Flex>
                                <Text ml={2} color="white" fontSize="sm">
                                  {location}
                                </Text>
                              </Flex>
                            ))}
                          </>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>

                {isSignedIn ? (
                  <>
                    <Flex align="center" py={2}>
                      <FaHeart color="#F6EEE5" size={16} />
                      <Text ml={3} color="white">
                        Wishlist
                      </Text>
                    </Flex>
                    <Flex align="center" py={2}>
                      <FaShoppingCart color="#F6EEE5" size={16} />
                      <Text ml={3} color="white">
                        Cart
                      </Text>
                    </Flex>
                    <Flex align="center" py={2}>
                      <FaGlobe color="#F6EEE5" size={16} />
                      <Text ml={3} color="white">
                        EN
                      </Text>
                    </Flex>
                    <Text
                      color="#D2AC71"
                      fontWeight={500}
                      verticalAlign="middle"
                      py={2}
                      fontSize="28px"
                    >
                      My profile
                    </Text>
                    <Text color="white" py={2}>
                      Saved deals
                    </Text>
                    <Text color="white" py={2}>
                      Invite friends
                    </Text>
                    <Text color="white" py={2}>
                      Settings
                    </Text>
                    <Text
                      color="red.400"
                      py={2}
                      fontWeight={400}
                      fontSize="28px"
                      verticalAlign="middle"
                      onClick={() => {
                        setIsSignedIn(false);
                        toggleMenu();
                      }}
                    >
                      Log out
                    </Text>
                  </>
                ) : (
                  <>
                    <Flex align="center" py={2}>
                      <FaGlobe color="#F6EEE5" size={16} />
                      <Text ml={3} color="white">
                        EN
                      </Text>
                    </Flex>
                    <Text
                      color="white"
                      py={2}
                      onClick={() => {
                        setIsSignedIn(true);
                        toggleMenu();
                      }}
                    >
                      Login
                    </Text>
                    <Text color="white" py={2}>
                      Sign up
                    </Text>
                  </>
                )}
              </Box>

              {/* Footer Logo */}
              <Box position="absolute" bottom={4} left={4}>
                <Text fontWeight="bold" fontSize="xl" color="white">
                  G<span style={{ color: "#d2ac71" }}>©</span>E
                </Text>
              </Box>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
