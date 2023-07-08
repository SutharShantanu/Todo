import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const AddModal = () => {
    return (
        <Modal
            isCentered
            size="xs"
            height="40vh"
            //   isOpen={isModal}
            //   onClose={handleClose}
            scrollBehavior="inside"
            motionPreset="slideInBottom">
            <ModalOverlay backdropFilter="blur(5px)" />
            <ModalContent rounded="2xl">
                <ModalHeader>Settings</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Tunes</FormLabel>

                        <FormHelperText fontStyle="italic"></FormHelperText>
                    </FormControl>
                </ModalBody>
                <ModalFooter
                    w="50%"
                    m="auto"
                    display="flex"
                    justifyContent="space-between">
                    <Button
                        variant="outline"
                        colorScheme="green"
                        rounded="2xl"
                        //   onClick={handleClose}
                    >
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        rounded="2xl"
                        //   onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddModal;
