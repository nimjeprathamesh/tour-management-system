import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { Form, useLocation } from 'react-router-dom';
import '../../layout/Backend/addUpdateFile.css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TourContext } from '../../context/context';

export default function TestimonialForm({testimonial, method, onPress}) {
    const { testimonialsFormData: formData, handleFormDataChange } = useContext(TourContext);
    const formBg = useColorModeValue('white', 'gray.700');
    const location = useLocation();
    const isAddPath = location.pathname === '/admin/testimonial/add';
    const icon = isAddPath ? FiPlusCircle : FiEdit;
    const heading = isAddPath ? 'Add Testimonial' : 'Update Testimonial';

    return (
        <Box id="addUpdate" w='full'>
            <Flex justifyContent='center'>
                <Heading as='h1' fontSize='1.8rem'>{heading}</Heading>
            </Flex>
            <Flex className='form' encType="multipart/form-data" justifyContent='center'>
                <Box
                    mt={2}
                    bg={formBg}
                    shadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
                    width='50rem'
                    rounded="md"
                >
                    <Form method={method} encType="multipart/form-data" onSubmit={(event) => onPress(event, testimonial)}>
                        <Box display="flex" flexDirection="column" gap={4}>
                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name='name'
                                    type="text"
                                    defaultValue={testimonial ? testimonial.name : formData.name}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("name")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="designation">
                                <FormLabel>Designation</FormLabel>
                                <Input
                                    name='designation'
                                    type="text"
                                    defaultValue={testimonial ? testimonial.designation : formData.designation}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("designation")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="image">
                                <FormLabel>Image</FormLabel>
                                <Input
                                    name='image'
                                    type="url"
                                    defaultValue={testimonial ? testimonial.image : formData.image}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("image")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="feedback">
                                <FormLabel>Feedback</FormLabel>
                                <Textarea
                                    name='feedback'
                                    defaultValue={testimonial ? testimonial.feedback : formData.feedback}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("feedback")(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                type='submit'
                                colorScheme='green'
                                variant="solid"
                                leftIcon={<Icon as={icon} />}
                            >
                                {heading}
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Flex>
        </Box>
    );
}

TestimonialForm.propTypes = {
    testimonial: PropTypes.object,
    method: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};