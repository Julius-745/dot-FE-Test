import { Box, HStack, Text } from "@chakra-ui/react";
import { Poppins } from "next/font/google";

const raleway = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const Navbar = () => {
  return (
    <Box w={"100%"} bgColor={"white"} p={2}>
      <HStack gap={2} justify={"center"}>
        <Text
          fontFamily={raleway.style.fontFamily}
          fontSize={"lg"}
          fontWeight={"bold"}
          color={"black"}
        >
          SHIPCOST
        </Text>
      </HStack>
    </Box>
  );
};
