import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Flex, Heading, Icon, Img, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { TourContext } from "../../context/context.jsx";
import Modal from "../../components/Modal.jsx";
import './TestimonialPage.css';
import useFunction from "../../hooks/useFunction.jsx";
import Loader from "../../components/Loader.jsx";
import GetError from "../../components/Error/GetError.jsx";

export default function TestimonialPage() {
    const {
        testimonials: data,testimonialError: error, testimonialLoader: loader
    } = useContext(TourContext);
    const [testimonialData, setTestimonialData] = useState([]);
    const { handleDeleteTetimonial } = useFunction();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        setTestimonialData(data);
    }, [data]);

    function handleUpdateClick(testimonial) {
        navigate(`/admin/testimonial/${testimonial.id}`, { state: { testimonial } });
    }

    async function handleDelete(id) {
        setTestimonialData(prev => prev.filter(testimonial => testimonial.id !== id));
        handleDeleteTetimonial(id);
        onClose();
    }

    return (
        <Box id="testimonial_content" w="100%" h="80%">
            <Heading as='h1' fontSize='1.8rem'>Testimonials Added</Heading>
            <Button leftIcon={<Icon as={FiPlusCircle} />} className="button" onClick={() => navigate('/admin/testimonial/add')}>
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
            <Flex flexWrap="wrap" justifyContent="space-between">
                {testimonialData && testimonialData?.map((testimonial) => (
                    <Card
                        key={testimonial.id}
                        className="testimonial-card"
                        maxW='lg'
                        margin='0.5rem'
                        flex="1 0 calc(50% - 1rem)"
                        width='100%'
                        p={4}
                    >
                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                            itemName='testimonial'
                            onConfirm={() => handleDelete(testimonial.id)}
                        />
                        <CardBody p={0}>
                            <Flex justifyContent="space-between" gap={5}>
                                <Img
                                    src={`/${testimonial?.image}`}
                                    className='tsImg'
                                    borderRadius='lg'
                                    height='10rem'
                                    width='10rem'
                                    transition='all 0.5s linear'
                                />
                                <Flex direction='column' justifyContent="space-between" gap={10}>
                                    <Text>{testimonial?.feedback}</Text>
                                    <Flex justifyContent="space-between">
                                        <Flex justifyContent="space-between" gap={5}>
                                            <Img
                                                src="../../../images/photo.jpg"
                                                className="ts-img-2"
                                                alt='testimonial'
                                            />
                                            <Heading size='xs'>{testimonial?.name}</Heading>
                                        </Flex>
                                        <Heading size='xs' mr={5}>{testimonial?.designation}</Heading>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </CardBody>
                        <Flex justifyContent='center'>
                            <CardFooter>
                                <ButtonGroup>
                                    <Flex justifyContent='space-between' gap='10rem'>
                                        <Button variant='solid' colorScheme='blue' onClick={() => handleUpdateClick(testimonial)}>
                                            <Icon marginRight='0.2rem' as={FiEdit} /><span>Update</span>
                                        </Button>
                                        <Button variant='solid' colorScheme='red' onClick={onOpen}>
                                            <Icon as={FiTrash2} marginRight='0.1rem' />Delete
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