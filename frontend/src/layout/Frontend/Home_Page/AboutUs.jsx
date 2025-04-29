import { Box, Button, Flex, FormControl, Heading, Img, Input, Text, Textarea } from '@chakra-ui/react';
import { useContext } from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';
import { Form, Link } from 'react-router-dom';
import { TourContext } from '../../../context/context';
import useFunction from '../../../hooks/useFunction';
import './AboutUs.css';

export default function AboutUs() {
	const { feedback, handleFormDataChange } = useContext(TourContext);
	const { handleAddFeedback } = useFunction();

	return (
		<Box id="homePageAboutUs">
			<Box className="about-area">
				<Flex justifyContent='space-between' className='about-container'>
					<Box className="about-content" flex="1" minWidth="300px" maxWidth="60%">
						<Text as='h6'>ABOUT US</Text>
						<Text as='h1'>We craft beautifully usefull marketing and digital products that grow.</Text>
						<Text as='h5'>LOREM IPSUM DOLOR SIT AMET CONSECTETURE.</Text>
						<Box className="about-image-overlay">
							<Img
								src="https://www.luzukdemo.com/demo/inside-tours/wp-content/themes/inside-tours-pro/images/about.jpg"
								className="over_img"
								alt='About Us'
								boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
							/>
							<Box className="about-overlay"></Box>
							<Img
								src="https://www.luzukdemo.com/demo/inside-tours/wp-content/themes/inside-tours-pro/images/aboutdot.png"
								className="about-image"
								alt='Dots'
							/>
							<Box className="about-sub-area">
								<Text as='h4'><Text as='span' mr={1}>25</Text>YEAR EXPERIENCE</Text>
								<Box className="about-btn">
									<Link to='/'>
										____ <Text as='span'>DISCOVER MORE</Text> +
									</Link>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box flex="1" minWidth="300px" maxWidth="40%" h="100%" className='contact-container'>
						<Box className='contact-area' p={4}  h="100%">
							<Heading as='h1' size='xl' mb={6}><Text as='span'>Get </Text>in touch!</Heading>
							<Form method='post' onSubmit={handleAddFeedback}>
								<FormControl id='name' mb={2}>
									<Input
										name='name'
										type='text'
										value={feedback?.name}
										placeholder='Enter the name'
										onChange={(e) => handleFormDataChange("name")(e.target.value)}
									/>
								</FormControl>
								<FormControl id='email' mb={2}>
									<Input
										name='email'
										type='email'
										value={feedback?.email}
										placeholder='Enter the email address'
										onChange={(e) => handleFormDataChange("email")(e.target.value)}
									/>
								</FormControl>
								<FormControl id='subject' mb={2}>
									<Input
										name='subject'
										type='text'
										value={feedback?.subject}
										placeholder='Subject'
										onChange={(e) => handleFormDataChange("subject")(e.target.value)}
									/>
								</FormControl>
								<FormControl id='message' mb={2}>
									<Textarea
										name='message'
										value={feedback?.message}
										placeholder='Write A Message'
										rows={3}
										onChange={(e) => handleFormDataChange("message")(e.target.value)}
										h="130px"
									/>
								</FormControl>
								<Button type='submit' className='submitButton' leftIcon={<FiArrowRightCircle />}>
									SUBMIT NOW
								</Button>
							</Form>
						</Box>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
}