import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Flex, Heading, Icon, Img, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal.jsx";
import { currencyFormatter } from "../../util/formatting.jsx";
import './MembershipPage.css';
import { TourContext } from "../../context/context.jsx";
import useFunction from "../../hooks/useFunction.jsx";
import Loader from "../../components/Loader.jsx";
import GetError from "../../components/Error/GetError.jsx";

export default function MembershipPage() {
    const {
        memberships: data, membershipError: error, membershipLoader: loader
    } = useContext(TourContext);
    const [membershipData, setMembershipData] = useState([]);
    const { handleDeleteMembership } = useFunction();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        setMembershipData(data);
    }, [data]);

    function handleUpdateClick(membership) {
        navigate(`/admin/membership/${membership.id}`, { state: { membership } });
    }

    async function handleDelete(id) {
        setMembershipData(prev => prev.filter(membership => membership.id !== id));
        handleDeleteMembership(id);
        onClose();
    }

    return (
        <Box id="main_content">
            <Heading as='h1' fontSize='1.8rem'>Memberships Added</Heading>
            <Button leftIcon={<Icon as={FiPlusCircle} />} className="button" onClick={() => navigate('/admin/membership/add')}>
                Add New
            </Button>
            <Flex justifyContent="center" alignItems="center">
                {loader && (
                    <Loader data={data} loader={loader} />
                )}
                {error && (
                    <GetError error={error} text="testimonial" />
                )}
            </Flex>
            <Flex flexWrap="wrap" justifyContent="space-between" margin='0 0.5rem'>
                {membershipData && membershipData?.map((membership) => (
                    <Card
                        key={membership.id}
                        className="membership-card"
                        maxW='md'
                        margin='0.5rem'
                        flex="1 0 calc(33.33% - 1rem)"
                        p={0}
                        overflow='hidden'
                        height='fit-content'
                    >
                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                            itemName='membership'
                            onConfirm={() => handleDelete(membership.id)}
                        />
                        <CardBody p={0}>
                            <Box className="member-image-overlay">
                                <Img
                                    src={`/${membership?.image}`}
                                    height='20rem'
                                    width='100%'
                                    transition='all 0.5s linear'
                                    borderTopRadius='6px'
                                />
                                <Box className="member-overlay"></Box>
                            </Box>
                            <Stack spacing='3' p={4} pb={0}>
                                <Heading size='md' className='heading'>{membership?.type}</Heading>
                                <Flex justifyContent='space-between'>
                                    <Text>
                                        <Icon mb={1} mr={1} color='#f41844' as={MdLocationPin} />
                                        {membership?.location}
                                    </Text>
                                    <Text>from-{currencyFormatter.format(membership?.price)}</Text>
                                </Flex>
                            </Stack>
                        </CardBody>
                        <Flex justifyContent='center'>
                            <CardFooter>
                                <ButtonGroup spacing='8'>
                                    <Flex justifyContent='space-between' gap='5rem'>
                                        <Button leftIcon={<Icon as={FiEdit} />} variant='solid' colorScheme='blue' onClick={() => handleUpdateClick(membership)}>
                                            Update
                                        </Button>
                                        <Button leftIcon={<Icon as={FiTrash2} />} variant='solid' colorScheme='red' onClick={onOpen}>
                                            Delete
                                        </Button>
                                    </Flex>
                                </ButtonGroup>
                            </CardFooter>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Box>
    );
}