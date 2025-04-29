import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiPhone } from 'react-icons/fi';
import { TfiEmail, TfiYoutube } from "react-icons/tfi";
import './UpperFooter.css';

export default function UpperFooter() {
	return (
		<Box className='upperfooter'>
			<Flex justifyContent='space-between' className='upperfooter-content'>
				<Flex justifyContent='space-between' gap={20} ml='3rem' className='contact'>
					<Text className='phone'><Icon as={FiPhone} id="call" />011122233355 Fri - Holy day</Text>
					<Text className='mail'>
						<Icon position='relative' bottom='0.1rem' right='0.3rem' as={TfiEmail} />
						<Link href="mailto:support.travel@gmail.com">
							support.travel@gmail.com
						</Link>
					</Text>
				</Flex>
				<Box className='connect'>
					<Link href="https://www.facebook.com/" target="__blank">
						<Text as='i' boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'>
							<Icon as={FaFacebookF} id="socialMedia" />
						</Text>
					</Link>
					<Link href="https://twitter.com/" target="__blank">
						<Text as='i' boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'>
							<Icon as={FaTwitter} id="socialMedia" />
						</Text>
					</Link>
					<Link href="https://www.instagram.com/" target="__blank">
						<Text as='i' boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'>
							<Icon as={FaInstagram} id="socialMedia" />
						</Text>
					</Link>
					<Link href="https://www.youtube.com/" target="__blank">
						<Text as='i' boxShadow='0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 18px 0 rgba(0, 0, 0, 0.19)'>
							<Icon as={TfiYoutube} id="socialMedia" />
						</Text>
					</Link>
				</Box>
			</Flex>
		</Box>
	);
}