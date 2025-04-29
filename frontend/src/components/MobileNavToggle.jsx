import {
    Accordion,
    Box,
    ChakraProvider,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Button,
    VStack,
    useColorMode
} from "@chakra-ui/react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { WiMoonAltNew } from "react-icons/wi";
import { FaPalette } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";

export default function MobileNavToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    function handleSetTheme(themeMode) {
        if (themeMode === 'system') {
            toggleColorMode();
        } else if (themeMode === 'light' && colorMode !== 'light') {
            toggleColorMode();
        } else if (themeMode === 'dark' && colorMode !== 'dark') {
            toggleColorMode();
        }
    }

    return (
        <ChakraProvider>
            <Accordion mt="1.5rem" mb="1.5rem" pl="0.7rem" allowToggle>
                <AccordionItem borderWidth={0}>
                    <AccordionButton borderWidth={0} pl="0.6rem">
                        <Box flex="1" textAlign="left">
                            <Box display="flex" alignItems="center">
                                <FiMenu
                                    style={{ marginRight: "1rem" }}
                                />
                                More
                            </Box>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Accordion allowToggle>
                            <AccordionItem borderWidth={0}>
                                <AccordionButton borderWidth={0} mb="0.5rem">
                                    <Box flex="1" textAlign="left">
                                        <Box display="flex" alignItems="center">
                                            <UserOutlined
                                                style={{ marginRight: "1rem" }}
                                            />
                                            Admin
                                        </Box>
                                    </Box>
                                </AccordionButton>
                            </AccordionItem>
                            <AccordionItem borderWidth={0}>
                                <AccordionButton borderWidth={0}>
                                    <Box flex="1" textAlign="left">
                                        <Box display="flex" alignItems="center">
                                            <FaPalette
                                                style={{ marginRight: "1rem" }}
                                            />
                                            Themes
                                        </Box>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    <VStack align="start" spacing={2}>
                                        <Button leftIcon={<WiMoonAltNew style={{ marginRight: "0.5rem" }} />} variant="ghost" onClick={() => handleSetTheme('system')}>
                                            System Default
                                        </Button>
                                        <Button leftIcon={<FiSun style={{ marginRight: "0.5rem" }} />} variant="ghost" onClick={() => handleSetTheme('light')}>
                                            Light
                                        </Button>
                                        <Button leftIcon={<FiMoon style={{ marginRight: "0.5rem" }} />} variant="ghost" onClick={() => handleSetTheme('dark')}>
                                            Dark
                                        </Button>
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </ChakraProvider>
    );
}