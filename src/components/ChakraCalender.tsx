"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface CalendarProps {
  initialMonth?: number;
  initialYear?: number;
  onDateSelect?: (range: { from: Date; to: Date | null }) => void;
  selectedRange?: { from: Date | null; to: Date | null };
}

export default function ChakraCalendar({
  initialMonth = 1,
  initialYear = 2025,
  onDateSelect,
  selectedRange = { from: null, to: null },
}: CalendarProps) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [selectionState, setSelectionState] = useState<{
    from: Date | null;
    to: Date | null;
  }>(selectedRange);

  useEffect(() => {
    if (selectedRange) {
      setSelectionState(selectedRange);
    }
  }, [selectedRange]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const firstMonth = currentMonthIndex;
  const firstMonthYear = currentYear;

  const secondMonth = (currentMonthIndex + 1) % 12;
  const secondMonthYear = secondMonth === 0 ? currentYear + 1 : currentYear;

  const handlePrevious = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getPreviousMonthDays = (year: number, month: number) => {
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    const prevMonthDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      prevMonthDays.unshift(daysInPrevMonth - i);
    }

    return prevMonthDays;
  };

  const isInRange = (date: Date) => {
    if (!selectionState.from) return false;
    if (!selectionState.to)
      return date.getTime() === selectionState.from.getTime();

    return (
      date.getTime() >= selectionState.from.getTime() &&
      date.getTime() <= selectionState.to.getTime()
    );
  };

  const isRangeStart = (date: Date) => {
    return (
      selectionState.from && date.getTime() === selectionState.from.getTime()
    );
  };

  const isRangeEnd = (date: Date) => {
    return selectionState.to && date.getTime() === selectionState.to.getTime();
  };

  const handleDateClick = (year: number, month: number, day: number) => {
    const clickedDate = new Date(year, month, day);

    if (!selectionState.from || (selectionState.from && selectionState.to)) {
      const newRange = { from: clickedDate, to: null };
      setSelectionState(newRange);
      if (onDateSelect) onDateSelect(newRange);
    } else {
      if (clickedDate < selectionState.from) {
        const newRange = { from: clickedDate, to: selectionState.from };
        setSelectionState(newRange);
        if (onDateSelect) onDateSelect(newRange);
      } else {
        const newRange = { from: selectionState.from, to: clickedDate };
        setSelectionState(newRange);
        if (onDateSelect) onDateSelect(newRange);
      }
    }
  };

  const generateCalendarData = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const prevMonthDays = getPreviousMonthDays(year, month);

    const days = [];

    for (const day of prevMonthDays) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const date = new Date(prevMonthYear, prevMonth, day);

      days.push({
        day,
        currentMonth: false,
        date,
        isInRange: isInRange(date),
        isRangeStart: isRangeStart(date),
        isRangeEnd: isRangeEnd(date),
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);

      days.push({
        day,
        currentMonth: true,
        date,
        isInRange: isInRange(date),
        isRangeStart: isRangeStart(date),
        isRangeEnd: isRangeEnd(date),
      });
    }

    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - prevMonthDays.length - daysInMonth;

    for (let day = 1; day <= nextMonthDays; day++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;
      const date = new Date(nextMonthYear, nextMonth, day);

      days.push({
        day,
        currentMonth: false,
        date,
        isInRange: isInRange(date),
        isRangeStart: isRangeStart(date),
        isRangeEnd: isRangeEnd(date),
      });
    }

    return days;
  };

  const firstMonthData = generateCalendarData(firstMonthYear, firstMonth);
  const secondMonthData = generateCalendarData(secondMonthYear, secondMonth);

  const dayBg = "#5A5A5A";
  const dayColor = "white";
  const inactiveDayBg = "#3C3C3C";
  const inactiveDayColor = "gray.500";
  const selectedDayBg = "#D2AC71";
  const selectedDayColor = "black";
  const rangeDayBg = "#F5E1BB";
  const rangeDayColor = "black";
  const headerColor = "white";
  const weekdayColor = "#D2AC71";

  return (
    <Box position="relative" width="100%">
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Navigation buttons */}
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous month"
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
          color="#D2AC71"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={handlePrevious}
          zIndex={2}
        />

        {/* First Month */}
        <Box flex="1">
          <Heading
            as="h3"
            size="md"
            textAlign="center"
            mb={4}
            color={headerColor}
          >
            {months[firstMonth]} {firstMonthYear}
          </Heading>
          <Grid templateColumns="repeat(7, 1fr)" gap={2}>
            {/* Days of week */}
            {daysOfWeek.map((day) => (
              <GridItem key={day} textAlign="center" py={2}>
                <Text fontSize="xs" fontWeight="medium" color={weekdayColor}>
                  {day}
                </Text>
              </GridItem>
            ))}

            {/* Calendar days */}
            {firstMonthData.map((day, index) => {
              let bg = day.currentMonth ? dayBg : inactiveDayBg;
              let color = day.currentMonth ? dayColor : inactiveDayColor;
              let borderRadius = "md";

              if (day.isInRange) {
                if (day.isRangeStart || day.isRangeEnd) {
                  bg = selectedDayBg;
                  color = selectedDayColor;
                } else {
                  bg = rangeDayBg;
                  color = rangeDayColor;
                  borderRadius = "none";
                }
              }

              if (day.isRangeStart && !day.isRangeEnd) {
                borderRadius = "md 0 0 md";
              }

              if (day.isRangeEnd && !day.isRangeStart) {
                borderRadius = "0 md md 0";
              }

              return (
                <GridItem key={`first-${index}`}>
                  <Box
                    as="button"
                    width="100%"
                    aspectRatio="1/1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={bg}
                    color={color}
                    borderRadius={borderRadius}
                    fontSize="sm"
                    fontWeight="medium"
                    onClick={() =>
                      day.currentMonth &&
                      handleDateClick(firstMonthYear, firstMonth, day.day)
                    }
                    cursor={day.currentMonth ? "pointer" : "default"}
                    _hover={
                      day.currentMonth
                        ? { bg: selectedDayBg, color: selectedDayColor }
                        : {}
                    }
                  >
                    {day.day}
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>

        {/* Second Month */}
        <Box flex="1">
          <Heading
            as="h3"
            size="md"
            textAlign="center"
            mb={4}
            color={headerColor}
          >
            {months[secondMonth]} {secondMonthYear}
          </Heading>
          <Grid templateColumns="repeat(7, 1fr)" gap={2}>
            {/* Days of week */}
            {daysOfWeek.map((day) => (
              <GridItem key={day} textAlign="center" py={2}>
                <Text fontSize="xs" fontWeight="medium" color={weekdayColor}>
                  {day}
                </Text>
              </GridItem>
            ))}

            {/* Calendar days */}
            {secondMonthData.map((day, index) => {
              let bg = day.currentMonth ? dayBg : inactiveDayBg;
              let color = day.currentMonth ? dayColor : inactiveDayColor;
              let borderRadius = "md";

              if (day.isInRange) {
                if (day.isRangeStart || day.isRangeEnd) {
                  bg = selectedDayBg;
                  color = selectedDayColor;
                } else {
                  bg = rangeDayBg;
                  color = rangeDayColor;
                  borderRadius = "none";
                }
              }

              if (day.isRangeStart && !day.isRangeEnd) {
                borderRadius = "md 0 0 md";
              }

              if (day.isRangeEnd && !day.isRangeStart) {
                borderRadius = "0 md md 0";
              }

              return (
                <GridItem key={`second-${index}`}>
                  <Box
                    as="button"
                    width="100%"
                    aspectRatio="1/1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={bg}
                    color={color}
                    borderRadius={borderRadius}
                    fontSize="sm"
                    fontWeight="medium"
                    onClick={() =>
                      day.currentMonth &&
                      handleDateClick(secondMonthYear, secondMonth, day.day)
                    }
                    cursor={day.currentMonth ? "pointer" : "default"}
                    _hover={
                      day.currentMonth
                        ? { bg: selectedDayBg, color: selectedDayColor }
                        : {}
                    }
                  >
                    {day.day}
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>

        {/* Navigation buttons */}
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next month"
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          color="#D2AC71"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={handleNext}
          zIndex={2}
        />
      </Flex>
    </Box>
  );
}
