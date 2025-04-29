import { Box, Text } from '@chakra-ui/react';
import './LowerFooter.css';

export default function LowerFooter() {
    return (
        <Box className='lowerfooter' p={4}>
            <Text className="lowerfooter-area" mt={4}>
                Copyright by <Text as='span' fontWeight='bold' color='white'>@inside-tours.</Text> All Rights Reserved
            </Text>
        </Box>
    );
}