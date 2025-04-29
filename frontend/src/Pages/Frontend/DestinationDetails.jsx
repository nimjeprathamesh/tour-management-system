import { TimeIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Heading, Icon, Img, List, ListItem, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaRegCalendar } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import { TourContext } from '../../context/context.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';
import Loader from '../../components/Loader.jsx';
import GetError from '../../components/Error/GetError.jsx';
import '../../layout/Frontend/DestinationInquiryForm.css';
import './DestinationDetails.css';
import InquiryForm from '../../layout/Frontend/InquiryForm.jsx';

export default function DestinationDetails() {
    const {
        destinations: data, destinationError: error, destinationLoader: loader, initialLoad
    } = useContext(TourContext);
    const params = useParams();
    const filteredData = data?.find((item) => item.id === parseInt(params?.id, 10)) || {};
    const { themeCss, isDark } = useTheme();
    const backgroundImageStyle = {
        backgroundImage: `url(../${filteredData?.image})`,
    };
    const borderColor = isDark ? 'lightBorder' : 'darkBorder';
    const formattedDate = new Date(filteredData?.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const filteredDestinations = data?.filter(
        (item) => item.id !== parseInt(params?.id, 10)
    ) || [];
    const detailsParagraphs = filteredData?.details?.split('\n');

    return (
        <Box>
            {error && (
                <GetError error={error} />
            )}
            {loader && (
                <Loader data={data} loader={loader} />
            )}
            {filteredData && (
                <>
                    <Box id="destinationHeader" style={backgroundImageStyle}>
                        <Box className="bottom-header">
                            <Heading as='h1'>{filteredData?.name}</Heading>
                        </Box>
                    </Box>
                    <Box id="destinationDetailsPage">
                        <Flex className="inner-area" style={themeCss} justifyContent='space-between'>
                            <Box margin='1.2rem 0' width='72%'>
                                <Heading as='h5'>
                                    <Icon as={FaRegCalendar} color='#ff1944' position='relative' mr={2} bottom='0.2rem' />
                                    {formattedDate}
                                </Heading>
                                <Divider className={borderColor} m={0} />
                                <Img
                                    mt={4}
                                    src={`../${filteredData?.image}`}
                                    alt='Destination Details'
                                    borderRadius={10}
                                    boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
                                />
                                <Text><Text as='i'><TimeIcon /></Text> {filteredData?.duration}</Text>
                                {detailsParagraphs?.map((paragraph, index) => (
                                    <Text key={index}>
                                        {index > 0}
                                        {paragraph}
                                    </Text>
                                ))}
                            </Box>
                            <Box className='inner-box-1'>
                                <InquiryForm />
                                {!initialLoad.destination && (
                                    <Box className="desti-list">
                                        <Heading as='h6' fontSize='1rem'>NEXT DESTINATION</Heading>
                                        <Divider className='hr-1' />
                                        <Divider className='hr-2' />
                                        <List className={borderColor}>
                                            {filteredDestinations.map((destination) => (
                                                <ListItem key={destination.id} className={borderColor}>
                                                    <NavLink to={`../destination/${destination.id}`}>
                                                        {destination.name}
                                                    </NavLink>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </Box>
                        </Flex>
                    </Box>
                </>
            )}
        </Box>
    );
}