import { Box, Card, CardBody, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme.jsx';
import Loader from '../../components/Loader.jsx';
import GetError from '../../components/Error/GetError.jsx';
import { currencyFormatter } from '../../util/formatting.jsx';
import './TourPackage.css';
import { TourContext } from '../../context/context.jsx';

export default function TourPackage() {
    const {
        packages: data, packageError: error, packageLoader: loader, excludeName, initialLoad, setInitialLoad, updateExcludedName
    } = useContext(TourContext);
    const { themeCss } = useTheme();
    const navigate = useNavigate();

    const handleReadMoreClick = (packages) => {
        updateExcludedName('packageName', packages?.title);
        localStorage.setItem('excludePackageName', JSON.stringify({ packageName: packages?.title }));
        navigate(`../package/${packages?.id}`);
    };

    useEffect(() => {
        if (initialLoad.package) {
            const storedExcludeName = localStorage.getItem('excludePackageName');
            if (storedExcludeName) {
                try {
                    const parsedExcludeName = JSON.parse(storedExcludeName);
                    if (parsedExcludeName.packageName !== excludeName.packageName) {
                        updateExcludedName('packageName', parsedExcludeName.packageName || null);
                    }
                } catch (err) {
                    console.error("Error parsing excludeName from localStorage:", err);
                }
            }
            setInitialLoad((prev) => ({ ...prev, package: false }));
        }
    }, [excludeName, initialLoad.package, setInitialLoad, updateExcludedName]);

    return (
        <Box>
            <Box id="tourPackageHeader">
                <Box className="bottom-header">
                    <Heading as='h1'>Tour Packages</Heading>
                </Box>
            </Box>
            <Box id="tour_page">
                {error && (
                    <GetError error={error} />
                )}
                {loader && (
                    <Loader data={data} loader={loader} />
                )}
                <Flex
                    wrap="wrap"
                    justifyContent="space-between"
                    flex='1 1 calc(33.33% - 1rem)'
                    className="inner-area"
                    style={themeCss}
                >
                    {data && data?.map((packages) => (
                        <Card key={packages?.id} maxW='sm' className='inner-box' onClick={() => handleReadMoreClick(packages)}>
                            <CardBody p={0} overflow='hidden'>
                                <Box className="inner-image-overlay">
                                    <Image src={packages?.image} borderTopRadius='lg' />
                                    <Box className="inner-overlay"></Box>
                                </Box>
                                <Stack p={4} spacing='3'>
                                    <Heading size='md' className='heading' m={0}>{packages?.title}</Heading>
                                    <Text m={0}>
                                        <Icon as={MdLocationPin} position='relative' bottom='0.1rem' color='#f41844' />
                                        {packages?.location}
                                    </Text>
                                    <Text className="para">{packages?.details}</Text>
                                    <Flex justifyContent='space-between'>
                                        <Text>{packages?.duration}</Text>
                                        <Text>{currencyFormatter.format(data?.price)}</Text>
                                    </Flex>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </Flex>
            </Box>
        </Box>
    );
}