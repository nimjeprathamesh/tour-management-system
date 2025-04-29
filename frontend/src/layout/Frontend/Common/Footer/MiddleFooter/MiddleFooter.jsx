import { Box, Divider, Flex, Heading, Img, List, ListItem, Text } from '@chakra-ui/react';
import './MiddleFooter.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { TourContext } from '../../../../../context/context.jsx';
import { GetSmallError } from '../../../../../components/Error/GetError.jsx';
import { SmallLoader } from '../../../../../components/Loader.jsx';
import { menuItem } from '../../../../../util/constant.jsx';

export default function MiddleFooter() {
    const {
        packages, packageError, packageLoader, destinations, destinationError, destinationLoader, excludeName, initialLoad, setInitialLoad, updateExcludedName
    } = useContext(TourContext);
    const location = useLocation();

    function handleReadMoreClick(destination) {
        updateExcludedName('destinationName', destination?.name);
        localStorage.setItem('excludeDestinationName',
            JSON.stringify({ destinationName: destination?.name })
        );
    };

    useEffect(() => {
        if (initialLoad.destination) {
            const storedExcludeName = localStorage.getItem('excludeDestinationName');
            if (storedExcludeName) {
                try {
                    const parsedExcludeName = JSON.parse(storedExcludeName);
                    if (parsedExcludeName.destinationName !== excludeName.destinationName) {
                        updateExcludedName('destinationName', parsedExcludeName.destinationName || null);
                    }
                } catch (err) {
                    console.error("Error parsing excludeName from localStorage:", err);
                }
            }
            setInitialLoad((prev) => ({ ...prev, destination: false }));
        }
    }, [excludeName, initialLoad.destination, setInitialLoad, updateExcludedName]);

    return (
        <Box className="middlefooter">
            <Flex justifyContent='space-between' gap={4} className='middlefooter-content'>
                <Box className="middlefooter-area">
                    <Img
                        src="../../../../../../images/logo.png"
                        className="middlefooter-logo"
                        alt='MiddleFooter'
                    />
                    <Text as='p'>
                        Today’s discerning consumers have high standards for their omnichannel customer experience whether they’re logging.
                    </Text>
                    <Text as='p'>
                        There are many variations of passages of Lorem Ipsum available, but majority have suffered alteration in some form.
                    </Text>
                </Box>
                <Box className="middlefooter-area">
                    <Heading className="heading">
                        Quick Links
                        <Divider className="hr" />
                    </Heading>
                    <List className="unorder">
                        {menuItem.map((item, index) => (
                            <ListItem key={index}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        isActive && location.pathname === `/${item.to}`
                                            ? 'activeLinks'
                                            : undefined
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box className="middlefooter-area">
                    <Heading className='heading'>Packages<Divider className='hr' /></Heading>
                    <List className="unorder">
                        {packageError && <GetSmallError data={packages} error={packageError} loader={packageLoader} />}
                        {packageLoader && <SmallLoader loader={packageLoader} />}
                        {packages && packages?.map((packages) => (
                            <ListItem key={packages.id}>
                                <NavLink
                                    to={`../package/${packages?.id}`}
                                    className={({ isActive }) => isActive ? 'activeLinks' : 'inactive'}
                                >
                                    {packages?.title}
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box className="middlefooter-area">
                    <Heading className='heading'>Destinations<Divider className='hr' /></Heading>
                    <List className={(!destinationError || destinations?.length > 6) ? "unorder scroll" : "unorder"}>
                        {destinationError && <GetSmallError data={destinations} error={destinationError} loader={destinationLoader} />}
                        {destinationLoader && <SmallLoader loader={destinationLoader} />}
                        {destinations && destinations
                            ?.map((destination) => (
                                <ListItem key={destination?.id}>
                                    <NavLink
                                        to={`../destination/${destination?.id}`}
                                        className={({ isActive }) => isActive ? 'activeLinks' : undefined}
                                        onClick={() => handleReadMoreClick(destination)}
                                    >
                                        {destination?.name}
                                    </NavLink>
                                </ListItem>
                            )
                            )}
                    </List>
                </Box>
            </Flex>
        </Box>
    );
}