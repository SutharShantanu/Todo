import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Box,
    Button,
    Badge,
    Heading,
    Flex,
    useColorModeValue,
    useDisclosure,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import UpdateModal from "./Modals/EditModal";
import Alert from "./Alert";
import { updateTodosStatus } from "../Redux/Todo/Action";

const TodoCard = ({ id, title, status }) => {
    const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
    const [isAlert, setIsAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const dispatch = useDispatch();

    const handleComplete = () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(updateTodosStatus(id));
            toast({
                title: "Todo marked completed",
                description: "",
                status: "success",
                duration: 2000,
                position: "top",
                isClosable: true,
            });
            setIsLoading(false);
        }, 2000);
    };

    return (
        <>
            <Flex
                key={id}
                position="relative"
                w={{ base: "100%", md: "100%" }}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow="md"
                rounded="2xl"
                mt={12}
                p={6}
                justifyContent="space-between"
                spacing={4}>
                <Box
                    position="absolute"
                    top="-16px"
                    left="50%"
                    transform="translateX(-50%)">
                    <Badge
                        variant="subtle"
                        bg={status === "completed" ? "green.100" : "red.100"}
                        color="gray.900"
                        fontWeight="normal"
                        px={2}
                        textTransform="capitalize"
                        py={1}
                        rounded="full"
                        align="center">
                        {status}
                    </Badge>
                </Box>
                <Flex
                    w={{ base: "100%", md: "100%" }}
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between">
                    <Heading
                        fontSize={{ base: "xl", md: "4xl" }}
                        mb={{ base: 4, md: 0 }}
                        fontFamily="body"
                        w={{ base: "100%", md: "40%" }}
                        color={status === "completed" ? "gray.400" : ""}
                        textDecoration={
                            status === "completed" ? "line-through" : "none"
                        }>
                        {title}
                    </Heading>
                    <Flex
                        w={{ base: "100%", md: "55%" }}
                        mb={{ base: 2, md: 0 }}
                        gap={2}
                        flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
                        justifyContent={{
                            base: "space-between",
                            md: "space-around",
                            lg: "space-between",
                        }}>
                        <Button
                            fontSize={{ base: "xs", md: "sm" }}
                            m={{ base: "auto", md: "0px" }}
                            fontWeight="normal"
                            rounded="full"
                            bg="gray.200"
                            color={"#0d0d0d"}
                            onClick={onOpen}
                            leftIcon={<EditIcon />}
                            _hover={{
                                bg: "gray.300",
                            }}
                            _focus={{
                                bg: "gray.300",
                            }}
                            textDecoration={
                                status === "completed" ? "line-through" : "none"
                            }
                            isDisabled={status === "completed"}>
                            Edit
                        </Button>
                        <Button
                            fontSize={{ base: "xs", md: "sm" }}
                            m={{ base: "auto", md: "0px" }}
                            fontWeight="normal"
                            rounded="full"
                            bg="red.400"
                            color="white"
                            onClick={() => setIsAlert(true)}
                            leftIcon={<DeleteIcon />}
                            boxShadow="0px 1px 25px -5px rgb(225 66 66 / 48%), 0 10px 10px -5px rgb(225 66 66 / 43%)"
                            _hover={{
                                bg: "red.500",
                            }}
                            _focus={{
                                bg: "red.500",
                            }}>
                            Delete
                        </Button>
                        <Button
                            fontSize={{ base: "xs", md: "sm" }}
                            rounded="full"
                            m={{ base: "auto", md: "0px" }}
                            fontWeight="normal"
                            bg="blue.400"
                            color="white"
                            leftIcon={<CheckCircleIcon />}
                            boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                            _hover={{
                                bg: "blue.500",
                            }}
                            _focus={{
                                bg: "blue.500",
                            }}
                            isLoading={isLoading}
                            loadingText="Updating"
                            spinner={
                                <Spinner
                                    color={useColorModeValue(
                                        "black",
                                        "white"
                                    )}
                                    size="xs"
                                />
                            }
                            onClick={handleComplete}
                            textDecoration={
                                status === "completed" ? "line-through" : "none"
                            }
                            isDisabled={status === "completed"}>
                            Completed
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            {isOpen && (
                <UpdateModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    title={title}
                    id={id}
                />
            )}
            {isAlert && (
                <Alert
                    isAlert={isAlert}
                    setIsAlert={setIsAlert}
                    title={title}
                    id={id}
                />
            )}
        </>
    );
};

export default TodoCard;
