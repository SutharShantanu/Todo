import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    Spinner,
    Highlight,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const Alert = ({ isOpen, onConfirm, onCancel, title }) => {
    const [isLoading, setIsLoading] = useState(false);

    const cancelRef = useRef();

    const handleDelete = () => {
        setIsLoading(true);
        setTimeout(() => {
            onConfirm();
            setIsLoading(false);
        }, 2000);
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
                <AlertDialogOverlay backdropFilter="blur(5px)" />

                <AlertDialogContent rounded="2xl">
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete{" "}
                        <Highlight
                            query={title}
                            styles={{
                                px: "2",
                                py: "1",
                                rounded: "2xl",
                                bg: "red.400",
                                color: "white",
                                fontStyle: "italic",
                            }}>
                            {title}
                        </Highlight>{" "}
                        from your Todos?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            fontWeight="normal"
                            variant="solid"
                            rounded="2xl"
                            onClick={handleClose}
                            isDisabled={isLoading} // Disable button during loading state
                        >
                            No
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme="red"
                            fontWeight="normal"
                            rounded="2xl"
                            ml={3}
                            onClick={handleDelete}
                            isLoading={isLoading}
                            loadingText="Deleting"
                            spinner={<Spinner color="#323234" size="xs" />}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Alert;
