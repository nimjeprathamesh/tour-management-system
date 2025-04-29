import {
    Box, Button, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue, useDisclosure
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import useFunction from '../../../hooks/useFunction';
import { useTheme } from '../../../hooks/useTheme';
import Modal from '../../../components/Modal';
import GetError from '../../../components/Error/GetError';
import Loader from '../../../components/Loader';

export default function ContactInfo({ feedback, error, loader }) {
    const { handleDeleteContact } = useFunction();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [contactToDelete, setContactToDelete] = useState(null);
    const [contactList, setContactList] = useState(feedback || []);
    const { isDark } = useTheme();
    const buttonTheme = isDark ? 'buttonLight' : 'buttonLight';
    const borderColor = isDark ? 'lightBorder' : 'darkBorder';
    const formBg = useColorModeValue('white', 'gray.700');

    useEffect(() => {
        setContactList(feedback || []);
    }, [feedback]);

    async function confirmDelete() {
        await handleDeleteContact(contactToDelete);
        setContactList(prev => prev.filter(contact => contact.id !== contactToDelete));
        onClose();
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={confirmDelete}
                itemName="feedback"
            />
            <Box>
                <TableContainer bg={formBg} className={`contSubTable ${borderColor}`}>
                    <Table className="cITable">
                        <Thead>
                            <Tr>
                                <Th colSpan={6} className='tableTitle'>Customers Feedback</Th>
                            </Tr>
                            <Tr>
                                <Th>Sr.No.</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Subject</Th>
                                <Th>Message</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {contactList.length > 0 && (
                                contactList.map((contact, index) => (
                                    <Tr key={contact?.id || index}>
                                        <Td className='center'>{index + 1}</Td>
                                        <Td>{contact?.name}</Td>
                                        <Td>{contact?.email}</Td>
                                        <Td>{contact?.subject}</Td>
                                        <Td>{contact?.message}</Td>
                                        <Td className='actionSec'>
                                            <Button
                                                className={`btn-btn-success ${buttonTheme}`}
                                                onClick={() => {
                                                    setContactToDelete(contact.id);
                                                    onOpen();
                                                }}
                                            >
                                                <Icon position='relative' bottom='0.1rem' as={FiTrash2} /> Delete
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
                {loader && (
                    <Loader data={feedback} loader={loader} />
                )}
                {error && (
                    <GetError error={error} text="feedback" />
                )}
            </Box>
        </>
    );
}

ContactInfo.propTypes = {
    feedback: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
};