import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, useColorModeValue } from '@chakra-ui/react';
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { Form, useLocation } from 'react-router-dom';
import '../../layout/Backend/addUpdateFile.css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TourContext } from '../../context/context';

export default function MembershipForm({membership, method, onPress}) {
    const { destinationFormData: formData, handleFormDataChange } = useContext(TourContext);
    const formBg = useColorModeValue('white', 'gray.700');
    const location = useLocation();
    const isAddPath = location.pathname === '/admin/membership/add';
    const icon = isAddPath ? FiPlusCircle : FiEdit;
    const heading = isAddPath ? 'Add Membership' : 'Update Membership';

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
                    <Form method={method} encType="multipart/form-data" onSubmit={(event) => onPress(event, membership)}>
                        <Box display="flex" flexDirection="column" gap={4}>
                            <FormControl id='type'>
                                <FormLabel>Type of Tour:</FormLabel>
                                <Input
                                    name='type'
                                    type='text'
                                    defaultValue={membership ? membership.type : formData.type}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("type")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id='location'>
                                <FormLabel>Location:</FormLabel>
                                <Input
                                    name='location'
                                    type='text'
                                    defaultValue={membership ? membership.location : formData.location}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("location")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id='file'>
                                <FormLabel>Package Image:</FormLabel>
                                <Input
                                    name='image'
                                    type='url'
                                    defaultValue={membership ? membership.image : formData.image}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("image")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id='price'>
                                <FormLabel>Package Price:</FormLabel>
                                <Input
                                    name='price'
                                    type='number'
                                    defaultValue={membership ? membership.price : formData.price}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("price")(e.target.value)}
                                />
                            </FormControl>
                            <Button type='submit' colorScheme="green" leftIcon={<Icon as={icon} />}>
                                {heading}
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Flex>
        </Box>
    );
}

MembershipForm.propTypes = {
    membership: PropTypes.object,
    method: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};