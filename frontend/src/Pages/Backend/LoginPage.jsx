import { Box, Button, Flex, FormLabel, Heading, Icon, IconButton, Image, Img, Input, useColorModeValue } from "@chakra-ui/react";
import { useTheme } from "../../hooks/useTheme.jsx";
import ToggleTheme from "../../components/ToggleTheme.jsx";
import './LoginPage.css';
import { FaEye, FaEyeSlash, FaLock, FaUserCircle } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { TourContext } from "../../context/context.jsx";

export default function LoginPage() {
    const { loginFormData, handleFormDataChange } = useContext(TourContext);
    const [showPassword, setShowPassword] = useState(false);
    const { isDark } = useTheme();
    const textColor = useColorModeValue('gray.800', 'white');
    const borderColor = { borderColor: isDark ? '#1a202c' : '#f9f9f9' };
    const iconColor = useColorModeValue('#1a202c', '#f9f9f9');
    const formBg = useColorModeValue('white', 'gray.700');
    const location = useLocation();
    const isSignIn = location.pathname === '/admin/signIn';
    const cssTheme = {
        backgroundColor: isDark ? '#1a202c' : '#560fb3',
        color: isDark ? '#f9f9f9' : '#1a202c'
    };

    // function handleToggleForm() {
    //     if (isSignIn) {
    //         navigate('/admin/signUp');
    //     } else {
    //         navigate('/admin/signIn');
    //     }
    // }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    return (
        <Flex id="loginPage" display='flex' justifyContent='center' style={cssTheme}>
            <Flex direction="column" alignItems="center">
                <Box>
                    <Img
                        src={isDark ? "../../../images/logoDark.png" : "../../../images/logo.png"}
                        className="logo_img"
                        alt="logo"
                    />
                </Box>
                <ToggleTheme />
                <Box margin='6rem 0'>
                <Box className='loginForm'>
                    <Box p={10} borderRadius="md" bg={formBg} width='32rem'>
                        <Box textAlign="center" mb={4}>
                            <Image
                                src="../../../images/lock.png"
                                alt="lock"
                                borderColor={formBg}
                                borderWidth='6px'
                                borderStyle='solid'
                                boxSize="60px"
                                className="lock_img"
                            />
                        </Box>
                        <Heading as="h1" size="lg" textAlign="center" mb={6} color={textColor}>
                            {/* {isSignIn ? 'Admin SignIn' : 'Admin SignUp'} */}
                            Admin SignIn
                        </Heading>
                        <Box mb={4} padding='0 1rem'>
                            <FormLabel>
                                <Icon marginLeft='0.2rem' marginRight='0.5rem' as={FaUserCircle} />Email *
                            </FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                borderColor={borderColor}
                                mb={2}
                                defaultValue={loginFormData?.email}
                                onChange={(e) => handleFormDataChange("email")(e.target.value)}
                            />
                        </Box>
                        <Box mb={4} padding='0 1rem'>
                            <FormLabel>
                                <Icon marginLeft='0.2rem' marginRight='0.5rem' as={FaLock} />Password *
                            </FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                borderColor={borderColor}
                                mb={2}
                                defaultValue={loginFormData?.password}
                                onChange={(e) => handleFormDataChange("password")(e.target.value)}
                            />
                            <IconButton
                                icon={<Icon as={showPassword ? FaEyeSlash : FaEye} />}
                                onClick={togglePasswordVisibility}
                                variant="ghost"
                                color={iconColor}
                                size="sm"
                                className='togglePassword'
                            />
                        </Box>
                        <Flex justifyContent='center' textAlign="center" padding='0 1rem'>
                            {/* <Button
                                variant='ghost'
                                leftIcon={<Icon as={isSignIn ? MdCreate : FaLock} />}
                                colorScheme={isDark ? 'blue' : 'teal'}
                                onClick={handleToggleForm}
                            >
                                {isSignIn ? 'Create new user' : 'SignIn'}
                            </Button> */}
                            <Button
                                type="submit"
                                leftIcon={<Icon as={isSignIn ? FaLock : MdCreate} />}
                                colorScheme={isDark ? 'blue' : 'teal'}
                            >
                                {/* {isSignIn ? 'SignIn' : 'Create'} */}
                                SignIn
                            </Button>
                        </Flex>
                    </Box>
                </Box>
                </Box>
            </Flex>
        </Flex>
    );
}