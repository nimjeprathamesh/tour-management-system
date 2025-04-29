import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Common() {
    return (
        <Box >
            <Header />
            <Box as="main">
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}