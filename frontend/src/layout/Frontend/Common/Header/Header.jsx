import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, IconButton, Img, List, ListItem, Text, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '../../../../hooks/useTheme.jsx';
import { TfiEmail } from 'react-icons/tfi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import './Header.css';
import { menuItem } from '../../../../util/constant.jsx';
import ToggleTheme from '../../../../components/ToggleTheme.jsx';
import { HamburgerIcon } from "@chakra-ui/icons";
import MobileNavToggle from '../../../../components/MobileNavToggle.jsx';

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const {isDark} = useTheme();
    const location = useLocation();
    const buttonHoverClass = isDark ? 'header-btn-dark' : 'header-btn-light';

    return (
        <Box>
            <Box id="top-header">
                <div className='header-content'>
                    <Text className='header-text'>
                        We are a experience company.
                        <Text as='span' ml={2} color='#f41844'>Contact Us!</Text>
                    </Text>
                    <Text mt={2} className='header-mail'>
                        <Icon as={TfiEmail} color='unset' /> <Link href="mailto:nimjeprathamesh1@gmail.com" className='mailNum'>
                            nimjeprathamesh1@gmail.com
                        </Link>
                    </Text>
                    <Text className='header-phone' mt={2}>
                        <Icon as={FiPhone} /> <Text as='span'  className='mailNum'>(+91) 985 022 7669</Text>
                    </Text>
                    <Button
                        padding='1.5rem'
                        fontWeight='bold'
                        className={`header-btn ${buttonHoverClass}`}
                        onClick={() => navigate('/contactUs')}
                    >
                        BOOK NOW
                    </Button>
                </div>
            </Box>
            <Box id="bottom-header" p={2}>
                <Flex justifyContent='space-between' flex="1 0 calc(33.33% - 1rem)" gap='7rem'>
                    <Img
                        src="https://www.luzukdemo.com/demo/inside-tours/wp-content/uploads/sites/35/2021/11/logo4.png"
                        alt='It is a logo.'
                        h="100%"
                        mt="0.5rem"
                    />
                    <HStack className='navbar'>
                        {menuItem.map((item, index) => (
                            <List key={index} m={0} p={0}>
                                <ListItem>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) => (
                                            isActive && location.pathname === `/${item.to}`
                                                ? 'activeBottomHeader'
                                                : undefined
                                        )}
                                    >
                                        <Icon position='relative' bottom='0.1rem' as={item.icon} /> {item.name}
                                    </NavLink>
                                </ListItem>
                            </List>
                        ))}
                    </HStack>
                    <ToggleTheme />
                </Flex>
            </Box>
            <Box id='mobile-header' bgColor="#000" p={3}>
                <Img
                    src="https://www.luzukdemo.com/demo/inside-tours/wp-content/uploads/sites/35/2021/11/logo4.png"
                    alt='It is a logo.'
                    h="100%"
                    mt="0.2rem"
                />
                <IconButton
                    onClick={onOpen}
                    icon={<HamburgerIcon />}
                    aria-label='Toggle Mobile Navigation'
                />
                <Drawer className='drawer-navbar' isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent bgColor="#111">
                        <DrawerCloseButton color="#fff" />
                        <DrawerHeader color="#fff">
                            <Img
                                src="https://www.luzukdemo.com/demo/inside-tours/wp-content/uploads/sites/35/2021/11/logo4.png"
                                alt='It is a logo.'
                                h="100%"
                            />
                        </DrawerHeader>
                        <DrawerBody>
                            <HStack flexDirection="column" gap="1.5rem" alignItems="start">
                                {menuItem.map((item, index) => (
                                    <List key={index} m={0} p={2}>
                                        <ListItem>
                                            <NavLink
                                                to={item.to}
                                                className={({ isActive }) => (
                                                    isActive && location.pathname === `/${item.to}`
                                                        ? 'activeBottomHeader'
                                                        : undefined
                                                )}
                                                onClick={onClose}
                                            >
                                                <Icon position='relative' bottom='0.1rem' right={2} as={item.icon} /> {item.name}
                                            </NavLink>
                                        </ListItem>
                                    </List>
                                ))}
                            </HStack>
                            <MobileNavToggle />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Box>
    );
}