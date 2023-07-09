import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
} from "@chakra-ui/react";
import { useRef } from "react";

const Alert = ({ isOpen, onConfirm, onCancel }) => {
    const cancelRef = useRef();

    const handleDelete = () => {
        onConfirm();
    };

    const handleClose = () => {
        onCancel();
    };

    return (
        <>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={handleClose}
                isCentered>
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your notes? 44
                        words will be deleted.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleClose}>
                            No
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={handleDelete}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Alert;
