/* eslint-disable react-hooks/rules-of-hooks */
import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Container,
    Divider,
    Flex,
    HStack,
    Heading,
    Highlight,
    IconButton,
    SkeletonText,
    Stack,
    Tag,
    TagLabel,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TodoCard from "../Components/TodoCard";
import AddModal from "../Components/Modals/AddModal";

const Todo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isModal, setIsModal] = useState(false);
    const [todos, setTodos] = useState([]);
    const toast = useToast();

    const handleChangeStatus = (id) => {
        setTodos((ele) => {
            const updatedTodos = ele.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, status: "completed" };
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };
    const handleDeleteTodo = (id, title) => {
        setIsLoading(true);
        setTimeout(() => {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            toast({
                title: `${title} has been deleted.`,
                description: ``,
                status: "error",
                duration: 2000,
                position: "top",
                isClosable: true,
            });
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            setTodos(storedTodos);
            setIsLoading(false);
        }, 2000);
    }, []);
    const total = todos.length.toString();

    return (
        <Box bg={useColorModeValue("white", "gray.700")} h="91vh">
            <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
                {isLoading ? (
                    <Stack spacing={0} align={"center"}>
                        <Box
                            bg={useColorModeValue("white", "gray.700")}
                            minH={"23vh"}
                            m={"auto"}
                            w={"100%"}>
                            <SkeletonText
                                mt="2"
                                noOfLines={1}
                                spacing="4"
                                w={{ base: "90%", md: "40%" }}
                                m="auto"
                                skeletonHeight="16"
                            />
                            <SkeletonText
                                w={{ base: "75%", md: "25%" }}
                                m="auto"
                                mt="4"
                                noOfLines={1}
                                spacing="4"
                                skeletonHeight="4"
                            />
                        </Box>
                    </Stack>
                ) : (
                    <Stack spacing={0} align={"center"}>
                        <Heading as={"h1"} size={{ base: "xl", md: "4xl" }}>
                            Your Todos&nbsp;
                            <Highlight
                                query={total}
                                styles={{
                                    px: "2",
                                    py: "1",
                                    rounded: "2xl",
                                    bg: "orange.200",
                                }}>
                                {total}
                            </Highlight>
                        </Heading>
                        <Text
                            fontSize={{ base: "xl", md: "2xl" }}
                            mt={2}
                            color={"gray.500"}>
                            Todo that helps to manage your life
                        </Text>
                    </Stack>
                )}
            </Container>
            {/* <Divider /> */}
            <Box
                w="70%"
                m="auto"
                boxShadow="md"
                rounded="2xl"
                py="4"
                bg={useColorModeValue("gray.200", "gray.900")}>
                <HStack
                    bg={useColorModeValue("gray.200", "gray.900")}
                    spacing={8}
                    my="4">
                    <Box w="60%" m="auto">
                        <Flex justifyContent="space-between">
                            <HStack>
                                <Tag
                                    size="lg"
                                    boxShadow="md"
                                    variant="subtle"
                                    borderRadius="full"
                                    colorScheme="green">
                                    <TagLabel>All</TagLabel>
                                </Tag>
                                <Tag
                                    size="lg"
                                    borderRadius="full"
                                    boxShadow="md"
                                    variant="subtle">
                                    <TagLabel>Pending</TagLabel>
                                </Tag>
                                <Tag
                                    size="lg"
                                    borderRadius="full"
                                    boxShadow="md"
                                    variant="subtle">
                                    <TagLabel>Completed</TagLabel>
                                </Tag>
                            </HStack>
                            <IconButton
                                boxShadow="md"
                                rounded="full"
                                colorScheme="green"
                                onClick={() => setIsModal(true)}
                                icon={<AddIcon />}
                            />
                        </Flex>
                        {isModal && (
                            <AddModal
                                isModal={isModal}
                                setIsModal={setIsModal}
                            />
                        )}
                        {todos.map((ele) => (
                            <TodoCard
                                key={ele.id}
                                id={ele.id}
                                title={ele.title}
                                status={ele.status}
                                onDelete={handleDeleteTodo}
                                onChange={handleChangeStatus}
                            />
                        ))}
                    </Box>
                    <Box
                        bg={useColorModeValue("gray.200", "gray.900")}
                        rounded={"2xl"}
                        textAlign="center"
                        w="30%"
                        h="100%"
                        m="auto">
                        Chart
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
};

export default Todo;
