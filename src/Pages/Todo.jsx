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
    SkeletonText,
    Stack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Todo = () => {
    const [isLoading, setIsLoading] = useState(true);

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
            <Divider />
            <HStack
                bg={useColorModeValue("white", "gray.700")}
                spacing={8}
                w="80%"
                m="auto"
                border="1px solid red">
                <Flex
                    justifyContent="space-between"
                    bg={useColorModeValue("white", "gray.700")}
                    // border="1px solid blue"
                    w="30%"
                    m="auto">
                    <Tag size="lg" borderRadius="full">
                        <TagLabel>All</TagLabel>
                    </Tag>

                    <Tag size="lg" borderRadius="full">
                        <TagLeftIcon boxSize="12px" as={AddIcon} />

                        <TagLabel>Pending</TagLabel>
                    </Tag>

                    <Tag size="lg" borderRadius="full">
                        <TagLeftIcon boxSize="12px" as={AddIcon} />

                        <TagLabel>Completed</TagLabel>
                    </Tag>
                </Flex>
                <Box
                    bg={useColorModeValue("white", "gray.700")}
                    spacing={8}
                    border="1px solid green"
                    w="30%"
                    h="100%"
                    m="auto"></Box>
            </HStack>
        </Box>
    );
};

export default Todo;
