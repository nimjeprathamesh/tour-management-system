import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TourContext } from '../../../context/context.jsx';
import SliderButton from '../../../components/SliderButton.jsx';
import { SliderData } from '../../../util/constant.jsx';
import './Slider.css';
import useFunction from '../../../hooks/useFunction.jsx';

export default function Slider() {
    const {
        index, transitionEnabled, setTransitionEnabled, manualNavigation, timeoutRef, resetTimeout
    } = useContext(TourContext);
    const { nextSlide, prevSlide } = useFunction();
    const navigate = useNavigate();

    const getBackgroundImageStyle = (slider) => ({
        backgroundImage: `url(${slider?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    });

    useEffect(() => {
        if (!transitionEnabled) {
            const timeout = setTimeout(() => setTransitionEnabled(true), 50);
            return () => clearTimeout(timeout);
        }

        if (!manualNavigation) {
            timeoutRef.current = setTimeout(nextSlide, 30000000);
        }

        return () => resetTimeout();
    }, [index, manualNavigation, resetTimeout, setTransitionEnabled, timeoutRef, transitionEnabled, nextSlide]);

    return (
        <Box id='homePageSlider' position="relative" overflow="hidden">
            <Flex
                className="slideshow"
                transform={`translate3d(${-index * 100}%, 0, 0)`}
                transition={transitionEnabled ? "transform 0.5s ease-in-out" : "none"}
            >
                {SliderData?.map((slider, idx) => (
                    <Box key={idx} minWidth="100%">
                        <Box
                            className='slider-image'
                            style={getBackgroundImageStyle(slider)}
                            height="92vh"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            color="white"
                            boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
                        >
                            <Box>
                                <Text mb={5} className='slider-text'>{slider?.text}</Text>
                                <Heading as='h1' className='slider-title' fontSize='6rem' fontWeight={900} mb={5}>{slider?.title}</Heading>
                                <Button className="theme-btn-s2" onClick={() => navigate('/contactUs')}>
                                    Contact Us
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Flex>
            <SliderButton prevSlide={prevSlide} nextSlide={nextSlide} />
        </Box>
    );
}