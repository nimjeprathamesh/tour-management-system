import { Alert, AlertTitle, Flex, Icon } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function GetError({ error }) {
    return (
        <>
            {error && (
                <Flex justifyContent="center" marginTop="4rem" zIndex="1" marginBottom="10">
                    <Alert
                        status="error"
                        variant="solid"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        width="xs"
                        backgroundColor="red.500"
                        color="#fff"
                        borderRadius="md"
                        zIndex="1"
                    >
                        <Icon as={MdOutlineErrorOutline} color="#fff" boxSize={6} />
                        <AlertTitle ml="2">{error}</AlertTitle>
                    </Alert>
                </Flex>
            )}
        </>
    );
};

GetError.propTypes = {
    error: PropTypes.string,
    text: PropTypes.string.isRequired,
};

export function GetSmallError({ data, error, loader }) {
    return (
        <>
            {(!data || error || !loader) && (
                <Flex justifyContent="center" marginTop="4rem">
                    <Alert
                        status="error"
                        variant="solid"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        width="15rem"
                        backgroundColor="red.500"
                        color="#fff"
                        borderRadius="md"
                        height="2.5rem"
                    >
                        <Icon as={MdOutlineErrorOutline} color="#fff" boxSize={6} />
                        <AlertTitle ml="2" fontSize="15">{error}</AlertTitle>
                    </Alert>
                </Flex>
            )}
        </>
    );
};

GetSmallError.propTypes = {
    data: PropTypes.array,
    error: PropTypes.string,
    loader: PropTypes.bool.isRequired,
};