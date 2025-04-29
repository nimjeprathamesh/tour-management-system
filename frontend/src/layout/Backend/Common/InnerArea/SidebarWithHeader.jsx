import { Box, Drawer, DrawerContent, Flex, Heading, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import MobileNav from './MobileNav';
import SidebarContent from './SidebarContent';

export default function SidebarWithHeader({ children }) {
    const { isOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Flex
                justify="space-between"
                align="center"
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue('gray.700', 'gray.700')}
            >
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full"
                >
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                <Heading as="h1" ml='30rem' textAlign="center" color='#00FF00'>Tour Management System</Heading>
                <MobileNav />
            </Flex>
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

SidebarWithHeader.propTypes = {
    children: PropTypes.node.isRequired
};