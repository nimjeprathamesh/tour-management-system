import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Flex, Heading, Icon, Img, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FiChevronsRight, FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TourContext } from "../../context/context.jsx";
import Modal from "../../components/Modal.jsx";
import { currencyFormatter } from "../../util/formatting.jsx";
import './PackagePage.css';
import useFunction from "../../hooks/useFunction.jsx";
import Loader from "../../components/Loader.jsx";
import GetError from "../../components/Error/GetError.jsx";

export default function PackagePage() {
    const {
        packages: data, packageError: error, packageLoader: loader, refreshKey, updateExcludedName
    } = useContext(TourContext);
    const [packagesData, setPackagesData] = useState([]);
    const { handleDeletePackage } = useFunction();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        setPackagesData(data);
    }, [data, refreshKey]);

    const handleReadMoreClick = (packages) => {
        updateExcludedName('packageName', packages?.name);
        localStorage.setItem('excludePackageName', JSON.stringify({ packageName: packages?.name }));
        navigate(`/package/${packages?.id}`);
    };

    function handleUpdateClick(packages) {
        navigate(`/admin/package/${packages.id}`, { state: { packages } });
    }

    async function handleDelete(id) {
        setPackagesData(prev => prev.filter(packages => packages.id !== id));
        handleDeletePackage(id);
        onClose();
    }

    return (
        <Box id="package_content" w="100%" h="80%">
            <Heading as='h1' fontSize='1.8rem'>Tours Added</Heading>
            <Button leftIcon={<Icon as={FiPlusCircle} />} className="addPackageBtn" onClick={() => navigate('/admin/package/add')}>
                Add New
            </Button>
            <Flex justifyContent="center" alignItems="center">
                {loader && (
                    <Loader data={data} loader={loader} />
                )}
                {error && (
                    <GetError error={error} text="packages" />
                )}
            </Flex>
            <Flex flexWrap="wrap" justifyContent="space-between">
                {packagesData && packagesData?.map((packages) => (
                    <Card
                        key={packages.id}
                        className="package-card"
                        maxW='xs'
                        margin='1rem 1rem'
                        flex="1 0 calc(33.33% - 1rem)"
                        p={0}
                    >
                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                            itemName='package'
                            onConfirm={() => handleDelete(packages.id)}
                        />
                        <CardBody p={0}>
                            <Box className="show-tours-image-overlay">
                                <Img
                                    src={`/${packages?.image}`}
                                    borderTopRadius='lg'
                                    height='20rem'
                                    width='100%'
                                    transition='all 0.5s linear' />
                                <Box className="show-tours-overlay"></Box>
                            </Box>
                            <Stack spacing='3' p={4}>
                                <Heading size='md' className='title'>{packages.title}</Heading>
                                <Text m={0}>
                                    <Icon m={0} mr={1} color='#f41844' as={MdLocationPin} />{packages.location}
                                </Text>
                                <Text className="package_details para" m={0}>{packages.details}</Text>
                                <Flex justifyContent="space-between">
                                    <Text>{packages.duration}</Text>
                                    <Text>{currencyFormatter.format(packages.price)}</Text>
                                </Flex>
                            </Stack>
                        </CardBody>
                        <CardFooter pt={0} pl={1.5} pr={1} pb={2}>
                            <ButtonGroup spacing='2'>
                                <Button rightIcon={<Icon as={FiChevronsRight} />} variant='solid' colorScheme='green' onClick={() => handleReadMoreClick(packages)}>
                                    Read more
                                </Button>
                                <Button leftIcon={<Icon as={FiEdit} />} variant='solid' colorScheme='blue' onClick={() => handleUpdateClick(packages)}>
                                    Update
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                        <Button leftIcon={<Icon as={FiTrash2} />} variant='solid' colorScheme='red' onClick={onOpen}>
                                    Delete
                                </Button>
                    </Card>
                ))}
            </Flex>
        </Box>
    );
}