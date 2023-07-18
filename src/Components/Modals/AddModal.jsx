/* eslint-disable no-undef */
import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    useColorModeValue,
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
    useToast,
} from "@chakra-ui/react";
import { PiTextTLight } from "react-icons/pi";
import { addTodo } from "../../Redux/Todo/Action";

const AddModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const toast = useToast();
    
    const handleChange = (e) => {
        const capitalizedTitle =
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        setTitle(capitalizedTitle);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAdd();
        }
      };

    const handleAdd = () => {
        if (title.trim() === "") {
            toast({
                title: "Title is required",
                description: "",
                status: "error",
                duration: 2000,
                position: "top",
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        const newTodo = {
            id: generateTodoId(todos),
            title: title,
            status: "pending",
        };
        setTimeout(() => {
            try {
                dispatch(addTodo(newTodo));
                toast({
                    title: "Todo created successfully",
                    description: "",
                    status: "success",
                    duration: 2000,
                    position: "top",
                    isClosable: true,
                });

                setTitle("");
                onClose();
            } catch (error) {
                toast({
                    title: "Failed to add todo",
                    description: ``,
                    status: "error",
                    duration: 2000,
                    position: "top",
                    isClosable: true,
                });
            }

            setIsLoading(false);
        }, 2000);
    };

    const generateTodoId = (data) => {
        if (!data || data.length === 0) {
            return 1;
        } else {
            let lastId = data[data.length - 1].id;
            return lastId + 1;
        }
    };

    return (
        <Modal
            isCentered
            size={{ base: "xs", md: "sm" }}
            height="40vh"
            isOpen={isOpen}
            onClose={onClose}
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
              onKeyDown={handleKeyPress}

                        isLoading={isLoading}
                        loadingText="Adding"
                        isDisabled={title.trim() === ""}
                        spinner={
                            <Spinner
                                color={useColorModeValue("black", "white")}
                                size="xs"
                            />
                        }>
                        Add
                    </Button>
                    <Button
                        fontWeight="normal"
                        variant="ghost"
                        rounded="2xl"
                        onClick={onClose}
                        isDisabled={isLoading}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddModal;
