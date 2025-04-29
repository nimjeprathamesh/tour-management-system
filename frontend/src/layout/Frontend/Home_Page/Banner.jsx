import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

export default function Banner() {
	const navigate = useNavigate();

	return (
		<Box id="homePageBanner">
			<Box className='ban-area'>
				<Image
					src="https://www.luzukdemo.com/demo/inside-tours/wp-content/themes/inside-tours-pro/images/bannerbg.jpg"
					alt='This is a banner.'
					boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'
				/>
				<Text as='h1'>
					<Text as='span'>
						Its time to upgrade to a lonely planet&nbsp;
					</Text>
					membership.
				</Text>
				<Box className="banner-btn" onClick={() => navigate('/destination')}>
					<Text>_________ <Text as='span'>DISCOVER MORE</Text> +</Text>
				</Box>
			</Box>
		</Box>
	);
}