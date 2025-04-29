import {
    Box, Button, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue, useDisclosure
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import useFunction from '../../../hooks/useFunction.jsx';
import { useTheme } from '../../../hooks/useTheme.jsx';
import Modal from '../../../components/Modal.jsx';
import Loader from '../../../components/Loader.jsx';
import GetError from '../../../components/Error/GetError.jsx';

export default function Subscription({ subscribe, error, loader }) {
    const { handleDeleteSubscription } = useFunction();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
    const [subscriptionList, setSubscriptionList] = useState(subscribe || []);
    const { isDark } = useTheme();
    const buttonTheme = isDark ? 'buttonLight' : 'buttonLight';
    const borderColor = isDark ? 'lightBorder' : 'darkBorder';
    const formBg = useColorModeValue('white', 'gray.700');

    useEffect(() => {
        setSubscriptionList(subscribe || []);
    }, [subscribe]);

    async function confirmDelete() {
        await handleDeleteSubscription(subscriptionToDelete);
        setSubscriptionList(prev => prev.filter(subscribe => subscribe.id !== subscriptionToDelete));
        onClose();
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={confirmDelete}
                itemName="subscription"
            />
            <Box>
                <TableContainer bg={formBg} className={`contSubTable ${borderColor}`}>
                    <Table className="cITable">
                        <Thead>
                            <Tr>
                                <Th colSpan={6} className='tableTitle'>Subscribed Customers</Th>
                            </Tr>
                            <Tr>
                                <Th key="srNo">Sr.No.</Th>
                                <Th key="email">Email</Th>
                                <Th key='action'>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {subscriptionList && subscriptionList?.map((subscription, index) => (
                                <Tr key={subscription?.id}>
                                    <Td className='center'>{index + 1}</Td>
                                    <Td>{subscription?.mail}</Td>
                                    <Td className='actionSec'>
                                        <Button
                                            className={`btn-btn-success ${buttonTheme}`}
                                            onClick={() => {
                                                setSubscriptionToDelete(subscription?.id);
                                                onOpen();
                                            }}
                                        >
                                            <Icon position='relative' bottom='0.1rem' as={FiTrash2} /> Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                {error && (
                    <GetError error={error} text="subscription" />
                )}
                {loader && (
                    <Loader data={subscribe} loader={loader} />
                )}
            </Box>
        </>
    );
}

Subscription.propTypes = {
    subscribe: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            mail: PropTypes.string,
        })
    ),
    error: PropTypes.string,
};