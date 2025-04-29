import { Box, Button, Card, CardBody, Flex, Heading, Icon, Img, Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect } from "react";
import { FiClock, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { TourContext } from '../../../context/context.jsx';
import { useTheme } from '../../../hooks/useTheme.jsx';
import Loader from '../../../components/Loader.jsx';
import GetError from '../../../components/Error/GetError.jsx';
import './Destination.css';

export default function Destination() {
    const { destinations: data, destinationError: error, destinationLoader: loader, excludeName, initialLoad, setInitialLoad, updateExcludedName } = useContext(TourContext);
    const limitedDestinations = data?.slice(0, 4);
    const { isDark } = useTheme();
    const buttonHoverClass = isDark ? 'service-1-area-btn-dark' : 'service-1-area-btn-light';
    const navigate = useNavigate();

    useEffect(() => {
        if (initialLoad.destination) {
            const storedExcludeName = localStorage.getItem('excludeDestinationName');
            if (storedExcludeName) {
                try {
                    const parsedExcludeName = JSON.parse(storedExcludeName);
                    if (parsedExcludeName.destinationName !== excludeName.destinationName) {
                        updateExcludedName('destinationName', parsedExcludeName.destinationName || null);
                    }
                } catch (err) {
                    console.error("Error parsing excludeName from localStorage:", err);
                }
            }
            setInitialLoad((prev) => ({ ...prev, destination: false }));
        }
    }, [excludeName, initialLoad.destination, setInitialLoad, updateExcludedName]);

    const handleReadMoreClick = (destination) => {
        updateExcludedName('destinationName', destination?.name);
        localStorage.setItem('excludeDestinationName', JSON.stringify({ destinationName: destination?.name }));
        navigate(`/destination/${destination?.id}`);
    };

    return (
        <Box id="homePageDestination">
            <Heading as="h1">
                <Text as='span' fontWeight='bold'>Top</Text> Destinations
            </Heading>
            {error && (
                <GetError error={error} />
            )}
            {loader && (
                <Loader data={data} loader={loader} />
            )}
            <Flex className='card-container' wrap="wrap" flex='1 1 calc(25% - 1rem)'>
                {limitedDestinations?.map((destination) => (
                    <Card
                        key={destination.id}
                        maxW='xs'
                        className='service-1-box'
                        onClick={() => handleReadMoreClick(destination)}
                    >
                        <CardBody p={0}>
                            <Box className="service-1-image-overlay">
                                <Img src={destination.image} alt={destination.name} />
                                <Box className="service-1-overlay"></Box>
                            </Box>
                            <Stack spacing='3' p={4} pb={0}>
                                <Heading size='md' m={0} className='heading'>{destination.name}</Heading>
                                <Text>
                                    <Icon position='relative' bottom='0.1rem' marginRight='0.5rem' as={FiClock} />
                                    {destination.duration}
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </Flex>
            {!error && (
                <Button
                    leftIcon={<FiEye size="20px" fontWeight="bolder" />}
                    className={`service-1-area-btn ${buttonHoverClass}`}
                    onClick={() => navigate('/destination')}
                >
                    VIEW ALL DESTINATION
                </Button>
            )}
        </Box>
    );
}