"use client";

import Hero from "@/components/Hero";
import RelevantHotelsSection from "@/components/RelevantHotelsSection";
import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import DiscoverPlacesSection from "@/components/DiscoverPlacesSection";
import WhyChooseUsSection from "@/components/WhyChooseEgyBook";
import TrendingDestinations from "@/components/TrendingDestination";
import Footer from "@/components/Footer";
import TravelBooking from "@/components/TravelBooking";

export default function HomePage() {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg="#121212"
      position="relative"
      overflow="hidden"
    >
      <Navbar />
      <Hero />
      <RelevantHotelsSection />
      <DiscoverPlacesSection />
      <WhyChooseUsSection />
      <TrendingDestinations />
      <TravelBooking />
      <Footer />

      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        height="300px"
        zIndex="1"
        opacity="50%"
        bgGradient="radial(circle at bottom center, rgba(210,172,113,0.3) 0%, rgba(18,18,18,1) 80%)"
        filter="blur(80px)"
        pointerEvents="none"
      />
    </Box>
  );
}
