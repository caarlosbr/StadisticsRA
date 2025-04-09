import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  );
}
