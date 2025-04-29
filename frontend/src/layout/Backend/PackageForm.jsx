import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { Form, useLocation } from 'react-router-dom';
import './addUpdateFile.css';
import { TourContext } from '../../context/context';
import { useContext } from 'react';
import PropTypes from 'prop-types';

export default function PackageForm({packages, method, onPress}) {
    const { packageFormData: formData, handleFormDataChange } = useContext(TourContext);
    const formBg = useColorModeValue('white', 'gray.700');
    const location = useLocation();
    const isAddPath = location.pathname === '/admin/package/add';
    const icon = isAddPath ? FiPlusCircle : FiEdit;
    const heading = isAddPath ? 'Add Package' : 'Update Package';

    return (
        <Box id="addUpdate" w='full'>
            <Flex justifyContent='center'>
                <Heading as='h1' fontSize='1.8rem'>{heading}</Heading>
            </Flex>
            <Flex className='form' justifyContent='center'>
                <Box
                    mt={2}
                    bg={formBg}
                    shadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
                    width='50rem'
                    rounded="md"
                >
                    <Form method={method} encType="multipart/form-data" onSubmit={(event) => onPress(event, packages)}>
                        <Box display="flex" flexDirection="column" gap={4}>
                            <FormControl id="title">
                                <FormLabel>Place Title:</FormLabel>
                                <Input
                                    name="title"
                                    type="text"
                                    defaultValue={packages ? packages?.title : formData?.title}
                                    onChange={(e) => handleFormDataChange("title")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="location">
                                <FormLabel>Tour Location:</FormLabel>
                                <Input
                                    name="location"
                                    type="text"
                                    defaultValue={packages ? packages?.location : formData?.location}
                                    onChange={(e) => handleFormDataChange("location")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="time">
                                <FormLabel>Tour Duration:</FormLabel>
                                <Input
                                    name="duration"
                                    type="text"
                                    defaultValue={packages ? packages?.duration : formData?.duration}
                                    onChange={(e) => handleFormDataChange("duration")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="details">
                                <FormLabel>Package Details:</FormLabel>
                                <Textarea
                                    name="details"
                                    defaultValue={packages ? packages?.details : formData?.details}
                                    onChange={(e) => handleFormDataChange("details")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="price">
                                <FormLabel>Package Price:</FormLabel>
                                <Input
                                    name="price"
                                    type="text"
                                    defaultValue={packages ? packages?.price : formData?.price}
                                    onChange={(e) => handleFormDataChange("price")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="file">
                                <FormLabel>Tour Image:</FormLabel>
                                <Input
                                    name="image"
                                    type="url"
                                    defaultValue={packages ? packages?.image : formData?.image}
                                    onChange={(e) => handleFormDataChange("image")(e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit" colorScheme='green' leftIcon={<Icon as={icon} />}>
                                {heading}
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Flex>
        </Box>
    );
}

PackageForm.propTypes = {
    packages: PropTypes.object,
    method: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};