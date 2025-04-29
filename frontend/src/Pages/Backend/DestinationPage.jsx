import {
    Box, Button, ButtonGroup, Card, CardBody, CardFooter, Flex, Heading, Icon, Img, Stack, Text, useDisclosure
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { FiChevronsRight, FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useFunction from "../../hooks/useFunction.jsx";
import Modal from "../../components/Modal.jsx";
import './DestinationPage.css';
import { TourContext } from "../../context/context.jsx";
import Loader from "../../components/Loader.jsx";
import GetError from "../../components/Error/GetError.jsx";

export default function DestinationPage() {
    const {
        destinations: data, destinationError: error, destinationLoader: loader, refreshKey, updateExcludedName
    } = useContext(TourContext);
    const [destinationsData, setDestinationsData] = useState([]);
    const { handleDeleteDestination } = useFunction();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialFocusRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setDestinationsData(data);
    }, [data, refreshKey]);

    const handleReadMoreClick = (destination) => {
        updateExcludedName('destinationName', destination?.name);
        localStorage.setItem('excludeDestinationName', JSON.stringify({ destinationName: destination?.name }));
        navigate(`/destination/${destination?.id}`);
    };

    const handleUpdateClick = (destination) => {
        navigate(`/admin/destination/${destination?.id}`, { state: { destination } });
    };

    async function handleDelete(id) {
        setDestinationsData(prev => prev.filter(destination => destination.id !== id));
        handleDeleteDestination(id);
        onClose();
    }

    return (
        <Box id="destination_content">
            <Heading as='h1' fontSize='1.8rem'>Destinations Added</Heading>
            <Button leftIcon={<Icon as={FiPlusCircle} />} className="button" onClick={() => navigate('/admin/destination/add')}>
                Add New
            </Button>
            <Flex justifyContent="center" position="absolute" left="45%" top="50%">
                {(!destinationsData || destinationsData?.length === 0) && (
                    <Text position="relative" top="60%">{destinationsData?.message}</Text>
                )}
            </Flex>
            <Flex justifyContent="center" alignItems="center">
                {loader && (
                    <Loader data={data} loader={loader} />
                )}
                {error && (
                    <GetError error={error} text="destinations" />
                )}
            </Flex>
            <Flex flexWrap="wrap" justifyContent="space-between" margin='0 0.5rem'>
                {destinationsData && destinationsData?.map((destination) => (
                    <Card
                        key={destination?.id}
                        className="destination-card"
                        maxW='sm'
                        margin='0.5rem'
                        flex="1 0 calc(25% - 1rem)"
                        p={0}
                        overflow='hidden'
                    >
                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                            itemName='destination'
                            onConfirm={() => handleDelete(destination?.id)}
                            initialFocusRef={initialFocusRef}
                        />
                        <CardBody p={0}>
                            <Box className="desti-img-overlay">
                                <Img
                                    src={`/${destination?.image}`}
                                    borderTopRadius='6px'
                                    height='20rem'
                                    width='100%'
                                    transition='all 0.5s linear'
                                />
                                <Box className="desti-overlay"></Box>
                            </Box>
                            <Stack spacing='3' p={4}>
                                <Heading size='md'>{destination?.name}</Heading>
                                <Text className="destination_details">{destination?.details}</Text>
                            </Stack>
                        </CardBody>
                        <CardFooter className='cardfooter'>
                            <ButtonGroup spacing='4' className='btn-grp'>
                                <Button leftIcon={<Icon as={FiEdit} />} variant='solid' colorScheme='blue' onClick={() => handleUpdateClick(destination)}>
                                    Update
                                </Button>
                                <Button leftIcon={<Icon as={FiTrash2} />} variant='solid' colorScheme='red' onClick={onOpen} ref={initialFocusRef}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                            <Button rightIcon={<Icon as={FiChevronsRight} />} variant='solid' colorScheme='green' onClick={() => handleReadMoreClick(destination)}>
                                Read More
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </Flex>
        </Box>
    );
}
