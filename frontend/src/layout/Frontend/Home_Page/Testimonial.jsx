import { Box, Divider, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { TourContext } from "../../../context/context.jsx";
import { useTheme } from '../../../hooks/useTheme.jsx';
import Loader from "../../../components/Loader.jsx";
import GetError from "../../../components/Error/GetError.jsx";
import { testimonialSetting } from '../../../util/constant.jsx';
import "./Testimonial.css";

export default function Testimonial() {
    const { testimonials: data, testimonialError: error, testimonialLoader: loader } = useContext(TourContext);
    const testimonialBg = useColorModeValue('white', 'gray.700');
    const { isDark } = useTheme();
    const settings = testimonialSetting(data, error);

    return (
        <Box as="section" id="homePageTestimonial">
            <Flex margin="0 0 4% 3%" justifyContent="flex-start" mb={4}>
                <Text as="nobr" className="heading" fontSize="5xl" fontWeight="100" ml={6}>
                    <Text as="span" fontWeight='bold'>Our</Text> Testimonials
                </Text>
            </Flex>
            <Box className={`ts-slider ${isDark ? 'dark-mode' : 'light-mode'}`} id="ts-slider">
                <Box className="ts-area" bg={testimonialBg} mb={4}>
                    {error && (
                        <GetError error={error} />
                    )}
                    {loader && (
                        <Loader data={data} loader={loader} />
                    )}
                    <Box className="testimonial-slider">
                        <Slider {...settings}>
                            {data && data?.map((testimonial, index) => (
                                <Box key={index} className='ts-slide'>
                                    <Box className="testimonial-slide">
                                        <Box className="testimonial_box">
                                            <Box className="testimonial_box-inner">
                                                <Box className="testimonial_box-top">
                                                    <Flex className="slides" direction={{ base: 'column', md: 'row' }}>
                                                        <Flex className="slider-container" justifyContent='space-between' gap={5}>
                                                            <Box>
                                                                <Image
                                                                    src={testimonial?.image}
                                                                    className="ts-img-1"
                                                                    alt="Testimonial"
                                                                />
                                                            </Box>
                                                            <Flex direction='column' justifyContent='space-between' gap={10}>
                                                                <Text className="para">{testimonial?.feedback}</Text>
                                                                <Flex justifyContent='space-between'>
                                                                    <Flex justifyContent='space-between'>
                                                                        <Image
                                                                            src="https://www.luzukdemo.com/demo/inside-tours/wp-content/themes/inside-tours-pro/images/testim02.png"
                                                                            alt="User"
                                                                            mr={4}
                                                                            height='2.5rem'
                                                                        />
                                                                        <Text className="name" mt={2} fontWeight="700">
                                                                            {testimonial?.name}
                                                                        </Text>
                                                                    </Flex>
                                                                    <Text fontWeight="bold" mt={2}>
                                                                        {testimonial?.designation}
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                    <Flex direction='column' className="hr-line" justifyContent="center" mt={4}>
                        <Divider className="hr-1" borderColor="gray.300" />
                        <Text as="span" mx={2}>
                            <Divider className="hr-2" borderColor="gray.300" />
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};
