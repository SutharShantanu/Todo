import {
    Box,
    Flex,
    SkeletonCircle,
    SkeletonText,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export const Header = () => {
    return (
        <Stack spacing={0} align={"center"}>
            <Box
                bg={useColorModeValue("white", "gray.700")}
                m="7px auto"
                w="100%">
                <SkeletonText
                    mt="2"
                    noOfLines={1}
                    spacing="4"
                    w={{ base: "90%", md: "40%" }}
                    m="auto"
                    skeletonHeight={{ base: "10", md: "16" }}
                />
                <SkeletonText
                    w={{ base: "75%", md: "25%" }}
                    m="auto"
                    mt="4"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight={{ base: "3", md: "4" }}
                />
            </Box>
        </Stack>
    );
};

export const SkeletonCards = () => {
    return (
        <Box
            bg={useColorModeValue("gray.100", "gray.800")}
            w="80%"
            padding="6"
            boxShadow="lg"
            rounded="2xl"
            m={"auto"}>
            <Flex
                justifyContent="space-between"
                flexDirection={{ base: "column", md: "row" }}
                spacing={8}
                my="4">
                <Box w={{ base: "90%", md: "60%" }} mx="auto" mt="0">
                    <Flex
                        justifyContent="space-between"
                        flexDirection={{ base: "column", md: "row" }}>
                        <Flex
                            justifyContent="space-between"
                            w={{ base: "100%", md: "40%" }}>
                            <SkeletonText
                                mt="2"
                                noOfLines={1}
                                spacing="4"
                                rounded="2xl"
                                skeletonHeight="6"
                                w="10%"
                            />
                            <SkeletonText
                                mt="2"
                                noOfLines={1}
                                spacing="4"
                                rounded="2xl"
                                skeletonHeight="6"
                                w="20%"
                            />
                            <SkeletonText
                                mt="2"
                                noOfLines={1}
                                spacing="4"
                                rounded="2xl"
                                skeletonHeight="6"
                                w="20%"
                            />
                        </Flex>
                        <Flex
                            spacing={2}
                            mt={{ base: 4, md: 0 }}
                            justifyContent="space-between"
                            w={{ base: "100%", md: "45%" }}>
                            <SkeletonText
                                mt="2"
                                noOfLines={1}
                                spacing="4"
                                rounded="2xl"
                                skeletonHeight="6"
                                w="70%"
                            />
                            <SkeletonCircle mb="4" size="10" m="auto"/>
                        </Flex>
                    </Flex>
                    <Box>
                        <Flex
                            boxShadow="lg"
                            rounded="2xl"
                            position="relative"
                            bg={useColorModeValue("white", "gray.700")}
                            w="100%"
                            p={6}
                            mt={12}
                            justifyContent="space-between"
                            spacing={4}>
                            <Box
                                position="absolute"
                                top="-16px"
                                left="50%"
                                width="90%"
                                transform="translateX(-50%)">
                                <SkeletonText
                                    mt="2"
                                    noOfLines={1}
                                    marginX="auto"
                                    spacing="4"
                                    rounded="2xl"
                                    skeletonHeight="4"
                                    w="25%"
                                />
                            </Box>
                            <Flex
                                w="100%"
                                flexDirection={{ base: "column", md: "row" }}
                                justifyContent="space-between">
                                <SkeletonText
                                    my="2"
                                    noOfLines={1}
                                    marginX="auto"
                                    spacing="4"
                                    rounded="2xl"
                                    skeletonHeight="6"
                                    w="40%"
                                />
                                <Flex
                                    w={{ base: "100%", md: "55%" }}
                                    mb={{ base: 2, md: 0 }}
                                    gap={2}
                                    flexWrap={{
                                        base: "wrap",
                                        md: "wrap",
                                        lg: "nowrap",
                                    }}
                                    justifyContent={{
                                        base: "space-between",
                                        md: "space-around",
                                        lg: "space-between",
                                    }}>
                                    <SkeletonCircle
                                        mb="4"
                                        size="10"
                                        m="auto"
                                        w="30%"
                                    />
                                    <SkeletonCircle
                                        mb="4"
                                        size="10"
                                        m="auto"
                                        w="30%"
                                    />
                                    <SkeletonCircle
                                        mb="4"
                                        size="10"
                                        m="auto"
                                        w="30%"
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
                <Box w={{ base: "100%", md: "35%" }} mx="auto">
                    <SkeletonText
                        mt="2"
                        noOfLines={1}
                        marginX="auto"
                        spacing="4"
                        rounded="2xl"
                        skeletonHeight="6"
                        w="15%"
                    />
                    <Box display="grid" placeItems="center" mt={8}>
                        <SkeletonCircle size="200px" />
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};
