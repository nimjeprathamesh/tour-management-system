import { Box, Card, CardBody, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { MdLocationPin } from 'react-icons/md';
import { TourContext } from '../../../context/context.jsx';
import Loader from '../../../components/Loader.jsx';
import GetError from '../../../components/Error/GetError.jsx';
import { currencyFormatter } from '../../../util/formatting.jsx';
import './Membership.css';

export default function Membership() {
    const { memberships: data, membershipError: error, membershipLoader: loader } = useContext(TourContext);

    return (
        <Box id="homePageMember">
            <Heading as="h1" size="xl">
                <Text as='span' fontWeight='bold'>Our</Text> Membership
            </Heading>
            {error && (
                <GetError error={error} />
            )}
            {loader && (
                <Loader data={data} loader={loader} />
            )}
            <Flex className='card-container' wrap="wrap" justifyContent="space-between" flex='1 1 calc(33.33% - 1rem)'>
                {(!error && data) && data?.map((membership, index) => (
                    <Card key={index} maxW='sm' className='member-box'>
                        <CardBody p={0}>
                            <Box className="member-image-overlay">
                                <Image src={membership?.image} alt='Membership' />
                                <Box className="member-overlay"></Box>
                            </Box>
                            <Stack spacing='3' p={4}>
                                <Heading size='md' className='type' m={0}>{membership?.type}</Heading>
                                <Flex justifyContent='space-between'>
                                    <Text className="caption-2">
                                        <Icon mr={1} mb={1} color='#f41844' as={MdLocationPin} />
                                        {membership?.location}
                                    </Text>
                                    <Text className="price">
                                        from-
                                        <Text as='span' fontWeight='500'>
                                            {currencyFormatter.format(membership?.price)}
                                        </Text>
                                    </Text>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </Flex>
        </Box>
    );
}