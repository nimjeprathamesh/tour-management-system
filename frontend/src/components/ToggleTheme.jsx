import {
    Accordion,
    Box, Button, ChakraProvider, Menu, MenuButton, MenuItem, MenuList, useColorMode,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from "@chakra-ui/react";
import { UserOutlined } from '@ant-design/icons';
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { WiMoonAltNew } from "react-icons/wi";
import { FaPalette } from "react-icons/fa";

export default function ToggleTheme() {
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
            <Menu placement="left">
                <MenuButton as={Button} variant='solid' colorScheme="blue" pos="absolute" top="1rem" right="1rem">
                    <FiMenu />
                </MenuButton>
                <MenuList position='absolute' inset='unset' top='1.5rem' right='-3.6rem' >
                    <MenuItem icon={<UserOutlined style={{ fontSize: "17px" }} />} onClick={() => handleSetTheme('system')}>
                        Admin
                    </MenuItem>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left" justifyContent="left">
                                    <Box display="flex" flexDirection="row" justifyContent="left">
                                        <FaPalette
                                            style={{position: "relative", right: 6, top: 4, marginRight: "5px"}}
                                        />Themes
                                    </Box>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                <MenuItem icon={<WiMoonAltNew />} onClick={() => handleSetTheme('system')}>
                                    System Default
                                </MenuItem>
                                <MenuItem icon={<FiSun />} onClick={() => handleSetTheme('light')}>
                                    Light
                                </MenuItem>
                                <MenuItem icon={<FiMoon />} onClick={() => handleSetTheme('dark')}>
                                    Dark
                                </MenuItem>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </MenuList>
            </Menu>
        </ChakraProvider>
    );
}