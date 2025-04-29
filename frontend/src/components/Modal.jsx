import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

export default function Modal({ isOpen, onClose, onConfirm, itemName, initialFocusRef }) {
    const cancelRef = useRef();

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} initialFocusRef={initialFocusRef}>
            <AlertDialogOverlay
                sx={{
                    bg: 'blackAlpha.300',
                    backdropFilter: 'blur(10px) hue-rotate(90deg)',
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete {itemName}
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure? You can&apos;t undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={onConfirm} ml={3} autoFocus>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    itemName: PropTypes.string.isRequired,
    initialFocusRef: PropTypes.object,
};