import { Flex, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../../../hooks/useTheme";
import PropTypes from 'prop-types';

export default function NavItem({ icon, children, path, ...rest }) {
    const { isDark } = useTheme();

    return (
        <NavLink
            to={path}
            style={{ textDecoration: 'none' }}
        >
            {({ isActive }) => (
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    margin='0.5rem 1rem'
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    bg={isActive ? '#f41844' : 'transparent'}
                    color={isDark ? '#fff' : (isActive ? '#fff' : '#000')}
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white',
                    }}
                    {...rest}
                >
                    {icon && (
                        <Icon mr="4" fontSize="16" _groupHover={{ color: 'white' }} as={icon} />
                    )}
                    {children}
                </Flex>
            )}
        </NavLink>
    );
}

NavItem.propTypes = {
    icon: PropTypes.elementType,
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
    rest: PropTypes.object,
};