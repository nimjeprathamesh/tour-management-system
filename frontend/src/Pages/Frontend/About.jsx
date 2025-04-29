import { TimeIcon } from '@chakra-ui/icons';
import {
    Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Icon, Image, Img, List, ListItem, Stack, Text
} from '@chakra-ui/react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { FiChevronsRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { TourContext } from '../../context/context.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';
import Loader from '../../components/Loader.jsx';
import GetError from '../../components/Error/GetError.jsx';
import './About.css';

export default function About() {
    const {
        destinations: data, destinationError: error, destinationLoader: loader, excludeName, initialLoad, setInitialLoad, updateExcludedName
    } = useContext(TourContext);
    const { themeCss, isDark } = useTheme();
    const buttonHoverClass = isDark ? 'service-btn-dark' : 'service-btn-light';
    const navigate = useNavigate();

    const handleReadMoreClick = (destination) => {
        updateExcludedName('destinationName', destination?.name);
        localStorage.setItem('excludeDestinationName', JSON.stringify({ destinationName: destination?.name }));
        navigate(`../destination/${destination?.id}`);
    };

    useEffect(() => {
        if (initialLoad.destination) {
            const storedExcludeName = JSON.parse(localStorage.getItem('excludeDestinationName')) || {};
            if (storedExcludeName.destinationName !== excludeName.destinationName) {
                updateExcludedName('destinationName', storedExcludeName.destinationName || null);
            }
            setInitialLoad((prev) => ({ ...prev, destination: false }));
        }
    }, [excludeName, initialLoad.destination, setInitialLoad, updateExcludedName]);

    return (
        <Box>
            <Box id="About_header">
                <Box className="bottom-header">
                    <Heading as='h1'>About</Heading>
                </Box>
            </Box>
            <Box id="description_page">
                <Box className="description_area" style={themeCss}>
                    <Box className="inner-box">
                        <Heading as='h1'>COUNTRIES WHERE OUR PRODUCT SUPPLY.</Heading>
                        <Divider className="horizontal" />
                        <Flex justifyContent='space-between' gap={50} className='description_container'>
                            <Box w="95rem">
                                <Text as='p'>
                                    Dolor sit amet, consectetur adipiscing elit. Vivamus eu pharetra ex. Etiam eget diam ligula. Sed at blandit ante. Vivamus feugiat, lacus eu suscipit mattis, tortor mi aliquam leo, quis laoreet ante sem sed sapien. Phasellus id convallis ligula. Aliquam erat volutpat Aliquam erat volutpat.
                                </Text>
                                <List p={0}>
                                    <ListItem>
                                        <FontAwesomeIcon icon={faCircle} id="icon" />We test your design with real users, analyze their feedback, and prioritize recommended improvements.
                                    </ListItem>
                                    <ListItem>
                                        <FontAwesomeIcon icon={faCircle} id="icon" />Understand long-term interaction and conversion cycles by collecting user diary entries over time and provide her the long term membership.
                                    </ListItem>
                                    <ListItem>
                                        <FontAwesomeIcon icon={faCircle} id="icon" />Discover user motivations and expectations with in-depth conversations, analyzed by experts to extract insights.
                                    </ListItem>
                                </List>
                            </Box>
                            <Box>
                                <Img
                                    src="/images/about.jpg"
                                    alt='About'
                                    boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
                                />
                            </Box>
                        </Flex>
                    </Box>
                </Box>
                <Box className="dest-area">
                    <Heading as='h1'>DESTINATION FOR THE CLIENT.</Heading>
                    <Divider className="horizontal" />
                    {error && (
                        <GetError error={error} />
                    )}
                    {loader && (
                        <Loader data={data} loader={loader} />
                    )}
                    <Flex className="dest-container" wrap="wrap" justifyContent="space-between" flex='1 1 calc(25% - 1rem)' gap={0}>
                        {data && data?.map((destination) => (
                            <Card key={destination?.id} maxW='xs' width='18rem' className="destination">
                                <CardBody p={0}>
                                    <Box className="desti-img-overlay">
                                        <Image src={destination?.image} />
                                        <Box className="desti-overlay"></Box>
                                    </Box>
                                    <Stack spacing='3' p={4}>
                                        <Heading fontSize='20px'>{destination?.Name}</Heading>
                                        <Text as='p'>{destination?.details}</Text>
                                        <Text>
                                            <Icon as={TimeIcon} position='relative' bottom='0.1rem' marginRight='0.5rem' />
                                            {destination?.duration}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <CardFooter padding='0 0 1rem 1rem'>
                                    <Button
                                        rightIcon={<FiChevronsRight />}
                                        className={`service-btn ${buttonHoverClass}`}
                                        onClick={() => handleReadMoreClick(destination)}
                                    >
                                        Read more
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}