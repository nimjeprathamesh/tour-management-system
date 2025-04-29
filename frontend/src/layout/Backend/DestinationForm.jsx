import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { Form, useLocation } from 'react-router-dom';
import { TourContext } from '../../context/context';
import { useTheme } from '../../hooks/useTheme';

export default function DestinationForm({ destination, method, onPress }) {
    const { destinationFormData: formData, refresh, handleFormDataChange } = useContext(TourContext);
    const formBg = useColorModeValue('white', 'gray.700');
    const location = useLocation();
    const isAddPath = location.pathname === '/admin/destination/add';
    const icon = isAddPath ? FiPlusCircle : FiEdit;
    const heading = isAddPath ? 'Add Destination' : 'Update Destination';
    const { isDark } = useTheme();

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            .ant-picker-panel-container {
                background-color: ${isDark ? "#171923" : "#fff"} !important;
            }
            .ant-picker-dropdown .ant-picker-header {
                border-bottom: ${isDark ? "1px solid #fff" : "1px solid #000"} !important;
            }
            .ant-picker-dropdown .ant-picker-header button {
                color: ${isDark ? "unset" : "#000"} !important;
            }
            .ant-picker-dropdown .ant-picker-content th {
                font-weight: bolder;
                color: ${isDark ? "#fff" : "#000"} !important;
            }
            .ant-picker-cell-inner,
            .ant-picker-header,
            .ant-picker-footer {
                color: ${isDark ? "#fff" : "#171923"} !important;
            }
            .ant-picker-dropdown .ant-picker-footer {
                border-top: ${isDark ? "1px solid #fff" : "1px solid #000"} !important;
            }
            .ant-picker-cell-inner:hover {
                background-color: ${isDark ? "#2D3748" : "#f0f0f0"} !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [isDark, refresh]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onPress(event, destination);
    };

    return (
        <Box id="addUpdate" display='contents'>
            <Heading as='h1' fontSize='1.8rem'>{heading}</Heading>
            <Flex className='form' justifyContent='center'>
                <Box mt={2} bg={formBg} rounded="md" width='50%'>
                    <Form method={method} encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Flex display="flex" flexDirection="column" gap={4}>
                            <FormControl id="date">
                                <FormLabel>Date:</FormLabel>
                                <DatePicker
                                    name='date'
                                    style={{
                                        backgroundColor: isDark ? "#2D3748" : "#fff",
                                        color: isDark ? "#fff" : "#2D3748"
                                    }}
                                    placeholder='Select the date'
                                    className='datepicker'
                                    defaultValue={destination?.date ? dayjs(destination.date) : (formData.date ? dayjs(formData.date) : null)}
                                    format="YYYY-MM-DD"
                                    onChange={(date, dateString) => handleFormDataChange("date")(dateString)}
                                    mode='date'
                                />
                            </FormControl>
                            <FormControl id="name">
                                <FormLabel>Name:</FormLabel>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Enter place name"
                                    defaultValue={destination ? destination?.name : formData?.name}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("name")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="duration">
                                <FormLabel>Duration:</FormLabel>
                                <Input
                                    name="duration"
                                    type="text"
                                    placeholder="Enter duration"
                                    defaultValue={destination ? destination?.duration : formData?.duration}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("duration")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="details">
                                <FormLabel>Details:</FormLabel>
                                <Textarea
                                    name="details"
                                    placeholder="Enter destination details"
                                    defaultValue={destination ? destination?.details : formData?.details}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("details")(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="image">
                                <FormLabel>Tour Image:</FormLabel>
                                <Input
                                    name="image"
                                    type="url"
                                    placeholder="Enter your image url"
                                    defaultValue={destination ? destination?.image : formData?.image}
                                    className="form-control addUpdatefield"
                                    onChange={(e) => handleFormDataChange("image")(e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit" colorScheme='green' leftIcon={<Icon as={icon} />}>
                                {heading}
                            </Button>
                        </Flex>
                    </Form>
                </Box>
            </Flex>
        </Box>
    );
}

DestinationForm.propTypes = {
    destination: PropTypes.object,
    method: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};