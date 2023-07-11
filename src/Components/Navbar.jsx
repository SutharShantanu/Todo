import React, { useState } from "react";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useColorModeValue,
    Tooltip,
    useColorMode,
    Image,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import {
    MoonIcon,
    SunIcon,
    AddIcon,
    QuestionIcon,
    SettingsIcon,
} from "@chakra-ui/icons";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { Link as ReactLink } from "react-router-dom";
import Light from "../Utilis/Light.png";
import Dark from "../Utilis/Dark.png";
import TuneModal from "./Modals/TuneModal";
import AddModal from "./Modals/AddModal";

export default function Navbar() {
    const [isModal, setIsModal] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const logo = colorMode === "light" ? Light : Dark;
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);




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
                <HStack spacing={8} alignItems="center" width="30%">
                    <ReactLink to="/">
                        <Image
                            style={{ width: "50px", height: "50px" }}
                            margin={{ base: "0px", md: "0px" }}
                            src={logo}
                            alt="logo"
                        />
                    </ReactLink>
                </HStack>

                <HStack></HStack>
                <HStack
                    width={{ base: "10%", md: "30%" }}
                    alignItems="end"
                    justifyContent="flex-end">
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

                    <Tooltip
                        hasArrow
                        label="More"
                        bg="gray.300"
                        color="#323234">
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                bg={useColorModeValue(
                                    "gray.100",
                                    "whiteAlpha.200"
                                )}
                                _hover={{
                                    bg: `${useColorModeValue(
                                        "gray.200",
                                        "whiteAlpha.300"
                                    )}`,
                                }}
                                _active={{
                                    bg: `${useColorModeValue(
                                        "gray.300",
                                        "whiteAlpha.400"
                                    )}`,
                                }}
                                icon={<CgMoreVerticalAlt />}
                                rounded="full"
                            />
                            <MenuList rounded="2xl">
                                <MenuItem
                                    rounded="2xl"
                                    icon={<AddIcon />}
                                    onClick={() => setIsModal(true)}>
                                    New Todo
                                </MenuItem>
                                <MenuItem rounded="2xl" icon={<QuestionIcon />}>
                                    FAQ
                                </MenuItem>
                                <MenuItem
                                    rounded="2xl"
                                    icon={<SettingsIcon />}
                                    onClick={() => setIsModal(true)}>
                                    Settings
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Tooltip>
                </HStack>
                {isModal && (
                    <AddModal
                        isModal={isModal}
                        setIsModal={setIsModal}
                        onAddTodo={handleAddTodo}
                    />
                )}
                {isModal === true ? (
                    <TuneModal isModal={isModal} setIsModal={setIsModal} />
                ) : (
                    ""
                )}
            </Flex>
        </Box>
    );
}
