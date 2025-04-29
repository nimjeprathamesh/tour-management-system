import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Loader() {
    return (
        <Flex justifyContent="center" position="relative" top="4.5rem">
            <Flex direction="column" justifyContent="center" alignItems="center" gap={5}>
                <div className="loader"></div>
                <div className="loader_text"></div>
            </Flex>
        </Flex>
    );
};

export function SmallLoader({ loader }) {
    return (
        <Flex justifyContent="center" position="relative" top="3rem">
            {loader && (
                <Flex direction="column" justifyContent="center" alignItems="center" gap={3}>
                    <div className="smallLoader"></div>
                    <div className="smallLoader_text"></div>
                </Flex>
            )}
        </Flex>
    );
}

SmallLoader.propTypes = {
    loader: PropTypes.bool.isRequired,
};