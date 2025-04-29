import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTheme } from '../../../../hooks/useTheme';
import { LinkItems } from "./LinkItems";
import NavItem from "./NavItem";

export default function SidebarContent({ onClose, ...rest }) {
    const adminId = localStorage.getItem('id');
    const { isDark } = useTheme();

    function handleClick() {
        onClose();
    }

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Image
                    src={isDark ? "/images/logo.png" : "images/logoDark.png"}
                />
            </Flex>
            {LinkItems.map((link) => {
                const fullPath = `/admin/${adminId}/${link.path}`;
                return (
                    <NavItem key={link.name} path={fullPath} icon={link.icon} onClick={handleClick}>
                        {link.name}
                    </NavItem>
                );
            })}
        </Box>
    );
};

SidebarContent.propTypes = {
    onClose: PropTypes.func.isRequired,
};