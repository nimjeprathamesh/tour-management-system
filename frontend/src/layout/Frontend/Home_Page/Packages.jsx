import { Box, Button, Card, CardBody, Flex, Heading, Icon, Img, Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { MdLocationPin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TourContext } from '../../../context/context.jsx';
import { useTheme } from '../../../hooks/useTheme.jsx';
import Loader from '../../../components/Loader.jsx';
import GetError from '../../../components/Error/GetError.jsx';
import { currencyFormatter } from '../../../util/formatting.jsx';
import './Packages.css';

export default function Packages() {
	const {
		packages: data, packageError: error, packageLoader: loader, excludeName, initialLoad, setInitialLoad, updateExcludedName
	} = useContext(TourContext);
	const limitedPackages = data?.slice(0, 3);
	const { isDark } = useTheme();
	const buttonHoverClass = isDark ? 'service-2-area-btn-dark' : 'service-2-area-btn-light';
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
		<Box id="homePagePackages">
			<Heading as="h1" size="xl">
				<Text as='span' fontWeight='bold'>Tour</Text> Packages
			</Heading>
			{error && (
				<GetError error={error} />
			)}
			{loader && (
				<Loader data={data} loader={loader} />
			)}
			<Flex className='card-container' wrap="wrap" justifyContent="center" flex='1 1 calc(33.33% - 1rem)' margin='0 4rem' gap={8}>
				{limitedPackages && limitedPackages?.map((packages) => (
					<Card key={packages.id} maxW='sm' className='service-2-box' id="adventour" onClick={() => handleReadMoreClick(packages)}>
						<CardBody p={0}>
							<Box className="service-2-image-overlay">
								<Img
									src={packages?.image}
									alt='Green double couch with wooden legs'
								/>
								<Box className="service-2-overlay"></Box>
							</Box>
							<Stack spacing='3' p={6}>
								<Heading size='md' fontWeight='900' className='title'>{packages?.title}</Heading>
								<Text m={0}>
									<Icon
										position='relative'
										bottom='0.1rem'
										marginRight='0.5rem'
										as={MdLocationPin}
										color='#f41844'
									/>
									{packages?.location}
								</Text>
								<Text className="para">{packages?.details}</Text>
								<Flex justifyContent='space-between'>
									<Text>{packages?.duration}</Text>
									<Text>{currencyFormatter.format(packages?.price)}</Text>
								</Flex>
							</Stack>
						</CardBody>
					</Card>
				))}
			</Flex>
			{(!error && !loader) && (
				<Button
					leftIcon={<FiEye size="20px" fontWeight="bolder" />}
					className={`service-2-area-btn ${buttonHoverClass}`}
					onClick={() => navigate('/tour-packages')}
				>
					VIEW ALL PACKAGES
				</Button>
			)}
		</Box>
	);
}