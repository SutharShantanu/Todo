/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Flex,
    Heading,
    Highlight,
    IconButton,
    Input,
    SkeletonText,
    Stack,
    Tag,
    TagLabel,
    Text,
    Tooltip,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import TodoCard from "../Components/TodoCard";
import AddModal from "../Components/Modals/AddModal";
import { AddIcon } from "@chakra-ui/icons";
import Charts from "../Components/Charts";

const Todo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isModal, setIsModal] = useState(false);
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all"); // State for selected filter
    const toast = useToast();

    const handleAddTodo = (newTodo) => {
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });

        setFilteredTodos((prevFilteredTodos) => {
            return [...prevFilteredTodos, newTodo];
        });
    };

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
                description: "",
                status: "error",
                duration: 2000,
                position: "top",
                isClosable: true,
            });
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        setTimeout(() => {
            const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            setTodos(storedTodos);
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const filteredTodos = todos.filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTodos(filteredTodos);
    }, [search, todos]);

    const handleFilter = (filter) => {
        setSelectedFilter(filter);

        switch (filter) {
            case "all":
                setFilteredTodos(todos);
                break;
            case "pending":
                setFilteredTodos(
                    todos.filter((todo) => todo.status === "pending")
                );
                break;
            case "completed":
                setFilteredTodos(
                    todos.filter((todo) => todo.status === "completed")
                );
                break;
            default:
                setFilteredTodos(todos);
        }
    };

    const pendingTodos = todos.filter((todo) => todo.status === "pending");
    const completedTodos = todos.filter((todo) => todo.status === "completed");
    const total = pendingTodos.length.toString();

    const sortedTodos = [...pendingTodos, ...completedTodos];
    const todosToDisplay = filteredTodos.length ? filteredTodos : sortedTodos;

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const filteredTodos = todos.filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTodos(filteredTodos);
    };

    const pieChartData = [
        { name: "Pending", value: pendingTodos.length },
        { name: "Completed", value: completedTodos.length },
    ];

    return (
        <Box bg={useColorModeValue("white", "gray.700")} minH="91vh">
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
                        <Heading as={"h1"} size={{ base: "2xl", md: "4xl" }}>
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
                            fontSize={{ base: "lg", md: "xl" }}
                            mt={2}
                            color={"gray.500"}>
                            Todo that helps to manage your life
                        </Text>
                    </Stack>
                )}
            </Container>
            <Box
                w="80%"
                m="auto"
                mb={8}
                boxShadow="md"
                rounded="2xl"
                py="4"
                bg={useColorModeValue("gray.200", "gray.900")}>
                <Flex
                    justifyContent="space-between"
                    flexDirection={{ base: "column", md: "row" }}
                    bg={useColorModeValue("gray.200", "gray.900")}
                    // border="1px solid red"
                    spacing={8}
                    my="4">
                    <Box
                        w={{ base: "90%", md: "60%" }}
                        mx="auto"
                        mt="0"
                        // border="1px solid green"
                    >
                        <Flex
                            justifyContent="space-between"
                            flexDirection={{ base: "column", md: "row" }}
                            // border="1px solid brown"
                        >
                            <Flex
                                justifyContent="space-between"
                                w={{ base: "100%", md: "40%" }}>
                                <Tag
                                    size="lg"
                                    boxShadow="md"
                                    borderRadius="full"
                                    colorScheme={
                                        selectedFilter === "all"
                                            ? "green"
                                            : undefined
                                    }
                                    cursor="pointer"
                                    onClick={() => handleFilter("all")}>
                                    <TagLabel>All</TagLabel>
                                </Tag>
                                <Tag
                                    size="lg"
                                    borderRadius="full"
                                    boxShadow="md"
                                    colorScheme={
                                        selectedFilter === "pending"
                                            ? "green"
                                            : undefined
                                    }
                                    cursor="pointer"
                                    onClick={() => handleFilter("pending")}>
                                    <TagLabel>Pending</TagLabel>
                                </Tag>
                                <Tag
                                    size="lg"
                                    borderRadius="full"
                                    boxShadow="md"
                                    colorScheme={
                                        selectedFilter === "completed"
                                            ? "green"
                                            : undefined
                                    }
                                    cursor="pointer"
                                    onClick={() => handleFilter("completed")}>
                                    <TagLabel>Completed</TagLabel>
                                </Tag>
                            </Flex>

                            <Flex
                                spacing={2}
                                mt={{ base: 4, md: 0 }}
                                justifyContent="space-between"
                                // border="1px solid brown"
                                w={{ base: "100%", md: "45%" }}>
                                <Input
                                    w="70%"
                                    type="search"
                                    placeholder="Search here"
                                    transition="all .3s ease-in-out"
                                    boxShadow="md"
                                    rounded="2xl"
                                    bg={useColorModeValue("white", "gray.700")}
                                    _focusVisible={{
                                        outline: "none",
                                    }}
                                    value={search}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                />
                                <Tooltip
                                    hasArrow
                                    label="New Todo"
                                    bg="white"
                                    color="#323234">
                                    <IconButton
                                        boxShadow="md"
                                        rounded="full"
                                        colorScheme="green"
                                        onClick={() => setIsModal(true)}
                                        icon={<AddIcon />}
                                    />
                                </Tooltip>
                            </Flex>
                        </Flex>
                        {isModal && (
                            <AddModal
                                isModal={isModal}
                                setIsModal={setIsModal}
                                onAddTodo={handleAddTodo}
                            />
                        )}

                        {todosToDisplay.map((ele) => (
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
                        w={{ base: "100%", md: "35%" }}
                        mx="auto">
                        <Heading as="h3" size="lg" textAlign="center">
                            Stats
                        </Heading>
                        <Charts data={pieChartData} />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Todo;
