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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TodoCard from "../Components/TodoCard";

const Todo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const handleAdd = () => {
        
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <Box bg={useColorModeValue("white", "gray.700")} mb={8}>
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
                                query={"0"}
                                styles={{
                                    px: "2",
                                    py: "1",
                                    rounded: "2xl",
                                    bg: "orange.200",
                                }}>
                                {"0"}
                            </Highlight>
                        </Heading>
                        <Text
                            fontSize={{ base: "xl", md: "2xl" }}
                            color={"gray.500"}>
                            Todo that help to manage your life
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
                // border="1px solid red"
                bg={useColorModeValue("gray.200", "gray.900")}>
                <HStack
                    bg={useColorModeValue("gray.200", "gray.900")}
                    spacing={8}
                    my="4">
                    <Box w="60%" m="auto">
                        <Flex
                            justifyContent="space-between"
                            bg={useColorModeValue("gray.200", "gray.900")}>
                            <Flex
                                justifyContent="space-between"
                                bg={useColorModeValue("gray.200", "gray.900")}
                                w="50%">
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
                            </Flex>
                            <Flex
                                justifyContent="end"
                                bg={useColorModeValue("gray.200", "gray.900")}
                                w="40%">
                                <IconButton
                                    boxShadow="md"
                                    rounded="full"
                                    colorScheme="green"
                                    // size="lg"
                                    onClick={handleAdd}
                                    icon={<AddIcon />}
                                />
                            </Flex>
                        </Flex>

                        <TodoCard />
                    </Box>
                    <Box
                        bg={useColorModeValue("gray.200", "gray.900")}
                        spacing={8}
                        // border="1px solid green"
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
