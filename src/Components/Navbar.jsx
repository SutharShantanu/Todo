import React from "react";
import {
    Box,
    Flex,
    HStack,
    Button,
    useColorModeValue,
    Tooltip,
    useColorMode,
    Image,
    Heading,
    Highlight,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";
import Light from "../Utilis/Light.png";
import Dark from "../Utilis/Dark.png";

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const logo = colorMode === "light" ? Light : Dark;

    return (
        <Box
            bg={useColorModeValue("gray.100", "gray.900")}
            px={4}
            position="fixed"
            top="0"
            zIndex="1000"
            width="100vw"
            boxShadow="lg">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <HStack spacing={8} alignItems="center">
                    <ReactLink to="/">
                        <Image
                            style={{
                                width: "50px",
                                height: "50px",
                                // border: "1px solid blue",
                            }}
                            margin={{ base: "0px", md: "0px" }}
                            src={logo}
                            alt="logo"
                        />
                    </ReactLink>
                </HStack>

                <HStack>
                    <Heading
                        lineHeight="tall"
                        color={useColorModeValue("black", "white")}
                        fontFamily="Cinzel, serif">
                        <Highlight
                            query="TODO'S"
                            styles={{
                                px: "2",
                                py: "1",
                                rounded: "full",
                                color: useColorModeValue("black", "white"),
                            }}>
                            TODO'S
                        </Highlight>
                    </Heading>
                </HStack>
                <HStack alignItems="end" justifyContent="flex-end">
                    <Tooltip
                        hasArrow
                        label="Switch color mode"
                        bg="gray.300"
                        color="#323234">
                        <Button
                            onClick={toggleColorMode}
                            p={0}
                            borderRadius="full">
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Tooltip>
                </HStack>
            </Flex>
        </Box>
    );
}
