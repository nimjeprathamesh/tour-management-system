import { Icon, IconButton } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import './SliderButton.css';

export default function SliderButton({ prevSlide, nextSlide }) {
    return (
        <>
            <IconButton
                onClick={prevSlide}
                icon={<Icon as={FiArrowLeft} />}
                position="absolute"
                left="10px"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                border="2px solid white"
                borderRadius='full'
                boxSize="50px"
                fontSize="20px"
                fontWeight='bold'
                p="10px"
                color='#fff'
                background='transparent'
                sx={{
                    '&:hover': {
                        bg: '#f41844',
                    }
                }}
                className="slider-btn"
            />
            <IconButton
                onClick={nextSlide}
                icon={<Icon as={FiArrowRight} />}
                position="absolute"
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                border="2px solid white"
                borderRadius='full'
                boxSize="50px"
                fontSize="20px"
                fontWeight='bold'
                p="10px"
                color='#fff'
                background='transparent'
                sx={{
                    '&:hover': {
                        bg: '#f41844',
                    }
                }}
                className="slider-btn"
            />
        </>
    );
};

SliderButton.propTypes = {
    prevSlide: PropTypes.func.isRequired,
    nextSlide: PropTypes.func.isRequired,
};