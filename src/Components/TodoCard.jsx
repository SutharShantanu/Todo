import {
    Box,
    Button,
    Badge,
    Heading,
    HStack,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Alert from "./Alert";
import { CheckCircleIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import UpdateModal from "./Modals/EditModal";


export default function TodoCard({ id, title, status, onDelete, onChange }) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);

    const handleDelete = () => {
        setIsAlertOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(id, title);
        setIsAlertOpen(false);
    };

    const handleCancelDelete = () => {
        setIsAlertOpen(false);
    };

    const handleEdit = () => {
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedTodo = {
            ...JSON.parse(localStorage.getItem("todos")).find(
                (todo) => todo.id === id
            ),
            title: updatedTitle,
        };

        const updatedTodos = JSON.parse(localStorage.getItem("todos")).map(
            (todo) => (todo.id === id ? updatedTodo : todo)
        );

        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        setIsModalOpen(false);
    };

    const handleComplete = () => {
        setCurrentStatus("completed");
        onChange(id);
    };

    return (
        <>
            <Flex
                key={id}
                position="relative"
                w="full"
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
                        bg={
                            currentStatus === "completed"
                                ? "green.100"
                                : "red.100"
                        }
                        color="gray.900"
                        fontWeight="normal"
                        px={2}
                        textTransform="capitalize"
                        py={1}
                        rounded="full"
                        align="center">
                        {currentStatus}
                    </Badge>
                </Box>
                <Heading
                    fontSize="4xl"
                    fontFamily="body"
                    w="40%"
                    color={currentStatus === "completed" ? "gray.400" : ""}
                    textDecoration={
                        currentStatus === "completed" ? "line-through" : "none"
                    }>
                    {title}
                </Heading>
                <HStack w="60%" justifyContent="space-between">
                    <Button
                        fontWeight="normal"
                        fontSize="sm"
                        rounded="full"
                        bg="gray.200"
                        color={"#0d0d0d"}
                        onClick={handleEdit}
                        leftIcon={<EditIcon />}
                        _hover={{
                            bg: "gray.300",
                        }}
                        _focus={{
                            bg: "gray.300",
                        }}
                        textDecoration={
                            currentStatus === "completed"
                                ? "line-through"
                                : "none"
                        }
                        isDisabled={currentStatus === "completed"}>
                        Edit
                    </Button>
                    <Button
                        fontSize="sm"
                        fontWeight="normal"
                        rounded="full"
                        bg="red.400"
                        color="white"
                        onClick={handleDelete}
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
                        fontSize="sm"
                        rounded="full"
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
                        onClick={handleComplete}
                        textDecoration={
                            currentStatus === "completed"
                                ? "line-through"
                                : "none"
                        }
                        isDisabled={currentStatus === "completed"}>
                        Completed
                    </Button>
                </HStack>
            </Flex>
            {isAlertOpen && (
                <Alert
                    isOpen={isAlertOpen}
                    onConfirm={handleConfirmDelete}
                    title={title}
                    onCancel={handleCancelDelete}
                />
            )}
            {isModalOpen && (
                <UpdateModal
                    isModal={isModalOpen}
                    setIsModal={setIsModalOpen}
                    title={title}
                    updatedTitle={updatedTitle}
                    setUpdatedTitle={setUpdatedTitle}
                    handleUpdate={handleUpdate}
                />
            )}
        </>
    );
}
