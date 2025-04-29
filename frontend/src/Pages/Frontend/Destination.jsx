import { TimeIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme.jsx';
import Loader from '../../components/Loader.jsx';
import GetError from '../../components/Error/GetError.jsx';
import './Destination.css';
import { TourContext } from '../../context/context.jsx';

export default function Destination() {
    const {
        destinations: data, destinationError: error, destinationLoader: loader, excludeName, initialLoad, setInitialLoad, updateExcludedName
    } = useContext(TourContext);
    const navigate = useNavigate();
    const { themeCss, isDark } = useTheme();
    const buttonHoverClass = isDark ? 'service-btn-dark' : 'service-btn-light';

    useEffect(() => {
        if (initialLoad.destination) {
            const storedExcludeName = JSON.parse(localStorage.getItem('excludeDestinationName')) || {};
            if (storedExcludeName.destinationName !== excludeName.destinationName) {
                updateExcludedName('destinationName', storedExcludeName.destinationName || null);
            }
            setInitialLoad((prev) => ({ ...prev, destination: false }));
        }
    }, [excludeName, initialLoad.destination, setInitialLoad, updateExcludedName]);

    const handleReadMoreClick = (destination) => {
        updateExcludedName('destinationName', destination?.Name);
        localStorage.setItem('excludeDestinationName', JSON.stringify({ destinationName: destination?.Name }));
        navigate(`../destination/${destination?.id}`)
    };

    return (
        <Box>
            <Box id="destHeader">
                <Box className="bottom-header">
                    <Heading as='h1'>Destination</Heading>
                </Box>
            </Box>
            <Box id="inner-page">
                {error && <GetError error={error} />}
                {loader && <Loader loader={loader} />}
                {data && (
                    <Flex
                        wrap='wrap'
                        justifyContent='center'
                        flex='1 1 calc(25% - 1rem)'
                        className="inner-area"
                        gap={5}
                        style={themeCss}
                    >
                        {data.map((destination) => (
                            <Card key={destination.id} maxW='sm' className="destination">
                                <CardBody p={0} overflow='hidden'>
                                    <Box className="desti-img-overlay">
                                        <Image src={destination?.image} borderTopRadius='lg' alt='Destination' />
                                        <Box className="desti-overlay"></Box>
                                    </Box>
                                    <Stack p={4} spacing='3'>
                                        <Heading size='md'>{destination?.name}</Heading>
                                        <Text as='p'>{destination?.details}</Text>
                                        <Text>
                                            <Icon as={TimeIcon} position='relative' bottom='0.1rem' mr={1} />
                                            {destination?.duration}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <CardFooter pt={0}>
                                    <Button
                                        className={`service-btn ${buttonHoverClass}`}
                                        onClick={() => handleReadMoreClick(destination)}
                                    >
                                        Read more<Icon as={FiChevronsRight} />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </Flex>
                )}
            </Box>
        </Box>
    );
}