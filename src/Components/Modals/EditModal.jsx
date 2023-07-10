import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

const UpdateModal = ({
    isModal,
    setIsModal,
    updatedTitle,
    setUpdatedTitle,
    handleUpdate,
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const toast = useToast();

    const handleChange = (e) => {
        setUpdatedTitle(e.target.value);
    };

    const handleClose = () => {
        setIsModal(false);
    };

    const handleSave = () => {
        setIsUpdating(true);

        setTimeout(() => {
            handleUpdate();

            toast({
                title: "Todo updated successfully.",
                description: "",
                status: "success",
                duration: 2000,
                position: "top",
                isClosable: true,
            });

            setIsModal(false);
            setIsUpdating(false);
        }, 2000);
    };

    return (
        <Modal
            isCentered
            size="sm"
            height="40vh"
            isOpen={isModal}
            onClose={handleClose}
            scrollBehavior="inside"
            motionPreset="slideInBottom">
            <ModalOverlay backdropFilter="blur(5px)" />
            <ModalContent rounded="2xl">
                <ModalHeader>Update Todo</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Updating a Todo Title</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <EditIcon color="gray.300" />
                            </InputLeftElement>
                            <Input
                                variant="outline"
                                type="text"
                                placeholder="Todo title"
                                onChange={handleChange}
                                value={updatedTitle}
                            />
                        </InputGroup>
                        <FormHelperText fontStyle="italic">
                            {updatedTitle === ""
                                ? `Your title will show here`
                                : updatedTitle}
                        </FormHelperText>
                    </FormControl>
                </ModalBody>
                <ModalFooter
                    w="80%"
                    m="auto"
                    display="flex"
                    justifyContent="space-between">
                    <Button
                        variant="outline"
                        colorScheme="green"
                        fontWeight="normal"
                        rounded="2xl"
                        onClick={handleSave}
                        isLoading={isUpdating}
                        loadingText="Updating"
                        spinner={<Spinner color="#323234" size="xs" />}
                        isDisabled={updatedTitle === ""}>
                        Update
                    </Button>
                    <Button
                        fontWeight="normal"
                        variant="ghost"
                        rounded="2xl"
                        onClick={handleClose}
                        isDisabled={isUpdating}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateModal;
