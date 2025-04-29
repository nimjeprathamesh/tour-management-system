import { Icon, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaLock, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext.jsx';

export default function useLogin() {
    const formRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        const credentials = {
            username: 'nimjeprathamesh1@gmail.com',
            password: '123456',
        };

        if (
            customerData.username === credentials.username &&
            customerData.password === credentials.password
        ) {
            login();
            navigate('homepage');
        } else if (
            customerData.username !== credentials.username ||
            customerData.password !== credentials.password
        ) {
            setErrorMessage('Invalid credentials');
        }

        if (formRef.current) {
            formRef.current.reset();
        }
    }

    const username = (
        <Text>
            <Icon marginLeft='0.2rem' marginRight='0.5rem' as={FaUserCircle} />Username *
        </Text>
    );

    const password = (
        <Text>
            <Icon marginLeft='0.2rem' marginRight='0.5rem' as={FaLock} />Password *
        </Text>
    );

    return {
        formRef, errorMessage, showPassword, username, password, handleSubmit, togglePasswordVisibility
    };
};
