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
import { PiTextTLight } from "react-icons/pi";

let idCounter = 0; // Initialize the counter

const AddModal = ({ isModal, setIsModal }) => {
    const [title, setTitle] = useState("");
    const [isButLoading, setIsButLoading] = useState(false);
    const toast = useToast();

    const handleChange = (e) => {
        const capitalizedTitle = e.target.value.replace(/^\w/, (c) =>
            c.toUpperCase()
        );
        setTitle(capitalizedTitle);
    };

    const handleAdd = () => {
        if (title !== "") {
            setIsButLoading(true);
            setTimeout(() => {
                const todoData = {
                    id: idCounter++, // Generate a unique ID using the counter
                    title: title,
                    status: "pending",
                };
                const existingTodos =
                    JSON.parse(localStorage.getItem("todos")) || [];
                const updatedTodos = [...existingTodos, todoData];
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
                setIsButLoading(false);
                toast({
                    title: "Todo added to list",
                    description: "",
                    status: "success",
                    variant: "subtle",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                setTitle("");
                handleClose();
            }, 2000);
        } else {
            toast({
                title: "Please fill the input field",
                status: "warning",
                variant: "left-accent",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }
    };

    const handleClose = () => {
        setIsModal(false);
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
                <ModalHeader>Add Todo</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Creating a Todo</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <PiTextTLight color="gray.300" />
                            </InputLeftElement>
                            <Input
                                variant="outline"
                                type="text"
                                placeholder="Todo title"
                                onChange={handleChange}
                                value={title}
                            />
                        </InputGroup>
                        <FormHelperText fontStyle="italic">
                            {title === "" ? `Your title will show here` : title}
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
                        onClick={handleAdd}>
                        {!isButLoading && `Save`}
                        {isButLoading && (
                            <Spinner
                                thickness="2px"
                                speed="0.50s"
                                emptyColor="gray.200"
                                color="#323234"
                                size="xs"
                            />
                        )}
                    </Button>
                    <Button
                        fontWeight="normal"
                        variant="ghost"
                        rounded="2xl"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddModal;
