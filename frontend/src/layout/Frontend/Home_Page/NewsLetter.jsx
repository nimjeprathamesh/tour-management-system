import { Box, Button, Flex, FormControl, Heading, Input, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FiBell } from "react-icons/fi";
import { Form } from "react-router-dom";
import { TourContext } from "../../../context/context.jsx";
import useFunction from "../../../hooks/useFunction.jsx";
import { useTheme } from '../../../hooks/useTheme.jsx';
import './NewsLetter.css';

export default function NewsLetter() {
	const { handleSubscribeChange, subscribe } = useContext(TourContext);
	const { handleAddSubscription } = useFunction();
	const { isDark } = useTheme();
	const buttonHoverClass = isDark ? 'subscribeButtonDark' : 'subscribeButtonLight';

	return (
		<Box id="homePageNewsletter">
			<Box className="newsletter-area">
				<Heading as='h1'>
					<Text as='span' fontWeight='700'>Get only</Text> new and unique update from this newsletter.
				</Heading>
				<Box className="subscribe">
					<Form method="post" onSubmit={handleAddSubscription}>
						<Flex wrap="wrap" align="center" padding='0 17rem' className="form_content">
							<FormControl flex="1" mr={4}>
								<Input
									name='mail'
									type="email"
									placeholder="Enter your email"
									value={subscribe && subscribe || ''}
									onChange={(event) => handleSubscribeChange(event)}
								/>
							</FormControl>
							<FormControl flex="0">
								<Button leftIcon={<FiBell />} type='submit' className={`subscribeButton ${buttonHoverClass}`}>
									SUBSCRIBE
								</Button>
							</FormControl>
						</Flex>
					</Form>
				</Box>
			</Box>
		</Box>
	);
}