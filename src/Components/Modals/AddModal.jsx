/* eslint-disable no-undef */
import {
    Button,
    Divider,
    Flex,
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
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { PiTextTLight } from "react-icons/pi";

let idCounter = null;

const AddModal = ({ isModal, setIsModal, onAddTodo }) => {
    const [title, setTitle] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
        if (existingTodos.length > 0) {
            const lastTodo = existingTodos[existingTodos.length - 1];
            idCounter = lastTodo.id + 1;
        } else {
            idCounter = 0;
        }
    }, []);

    const handleChange = (e) => {
        const capitalizedTitle = e.target.value.replace(/^\w/, (c) =>
            c.toUpperCase()
        );
        setTitle(capitalizedTitle);
    };

    const handleAdd = () => {
        if (title !== "") {
            setIsAdding(true);
            setTimeout(() => {
                const todoData = {
                    id: idCounter++,
                    title: title,
                    status: "pending",
                };
                onAddTodo(todoData);
                setIsAdding(false);
                toast({
                    title: "Todo added to list",
                    description: "",
                    status: "success",
                    variant: "solid",
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
            size={{ base: "xs", md: "sm" }}
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
                        <Flex justifyContent="space-between">
                            <FormLabel>Creating a Todo</FormLabel>
                            <Text
                                m="auto 0 auto auto"
                                color="gray"
                                fontSize="xs"
                                as="i">
                                Max Char. 15
                            </Text>
                        </Flex>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <PiTextTLight
                                    color="gray.300"
                                    fontWeight="bold"
                                />
                            </InputLeftElement>
                            <Input
                                variant="outline"
                                type="text"
                                placeholder="Todo title"
                                _focusVisible={{ outline: "none" }}
                                maxLength={15}
                                onChange={handleChange}
                                value={title}
                            />
                        </InputGroup>
                        <FormHelperText fontStyle="italic" color="gray">
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
                        onClick={handleAdd}
                        isLoading={isAdding}
                        loadingText="Adding"
                        spinner={<Spinner color="#323234" size="xs" />}
                        isDisabled={title === ""}>
                        Add
                    </Button>
                    <Button
                        fontWeight="normal"
                        variant="ghost"
                        rounded="2xl"
                        onClick={handleClose}
                        isDisabled={isAdding}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddModal;
