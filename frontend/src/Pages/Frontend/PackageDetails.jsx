import { Box, Divider, Flex, Heading, Icon, Img, List, ListItem, Text } from '@chakra-ui/react';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { MdLocationPin } from 'react-icons/md';
import { NavLink, useParams } from 'react-router-dom';
import { TourContext } from '../../context/context.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';
import Loader from '../../components/Loader.jsx';
import GetError from '../../components/Error/GetError.jsx';
import { currencyFormatter } from '../../util/formatting.jsx';
import '../../layout/Frontend/PackageInquiryForm.css';
import './PackageDetails.css';
import InquiryForm from '../../layout/Frontend/InquiryForm.jsx';

export default function PackageDetails() {
    const { packages: data, packageError: error, packageLoader: loader, initialLoad } = useContext(TourContext);
    const params = useParams();
    const filteredData = data?.find((item) => item.id === parseInt(params?.id, 10)) || {};
    const { themeCss, isDark } = useTheme();
    const backgroundImageStyle = { backgroundImage: `url(../${filteredData?.image})` };
    const detailsParagraphs = filteredData?.details?.split('\n');
    const borderColor = isDark ? 'lightBorder' : 'darkBorder';
    const filteredPackages = data?.filter(
        (item) => item.id !== parseInt(params?.id, 10)
    ) || [];

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
                    <Box id="packageDetailsHeader" style={backgroundImageStyle}>
                        <Box className="bottom-header">
                            <Heading as='h1'>{filteredData?.title}</Heading>
                        </Box>
                    </Box>
                    <Box id="packageDetailsPage">
                        <Flex className="inner-area" style={themeCss} justifyContent='space-between'>
                            <Box margin='1.2rem 0' width='72%'>
                                <Flex justifyContent='space-between'>
                                    <Heading as='h5'>
                                        <Icon as={MdLocationPin} position='relative' bottom='2px' />{filteredData?.title}
                                    </Heading>
                                    <Text className='timeprice'>
                                        <FontAwesomeIcon icon={faCalendarDays} /> {filteredData?.duration}
                                    </Text>
                                    <Text as='span' style={{ color: "#ff1944" }}>{currencyFormatter.format(filteredData?.price)}</Text>
                                </Flex>
                                <Divider className={borderColor} m={0} />
                                <Img
                                    mt={4}
                                    mb={8}
                                    src={`../${filteredData?.image}`}
                                    alt='Package Details'
                                    borderRadius={10}
                                    boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
                                />
                                <Text>
                                    <Icon as={MdLocationPin} position='relative' bottom='0.1rem' color='#ff1944' />
                                    {filteredData?.location}
                                </Text>
                                {detailsParagraphs?.map((paragraph, index) => (
                                    <p key={index}>
                                        {index > 0}
                                        {paragraph}
                                    </p>
                                ))}
                            </Box>
                            <Box className='inner-box-1'>
                                <InquiryForm />
                                {!initialLoad.package && (
                                    <Box className="inner-box-2">
                                        <Heading as='h6' fontSize='1rem'>OTHER PACKAGES</Heading>
                                        <Divider className='hr-1' />
                                        <Divider className='hr-2' />
                                        <List className={borderColor}>
                                            {filteredPackages?.map((packages) => (
                                                <ListItem key={packages.id} className={borderColor}>
                                                    <NavLink to={`../package/${packages.id}`}>
                                                        {packages.title}
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