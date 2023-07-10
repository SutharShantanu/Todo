import React, { useState } from "react";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    Tooltip,
    useColorMode,
    Collapse,
    Image,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import {
    MoonIcon,
    SunIcon,
    HamburgerIcon,
    CloseIcon,
    AddIcon,
    QuestionIcon,
    SettingsIcon,
} from "@chakra-ui/icons";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { Link as ReactLink } from "react-router-dom";
import Light from "../Utilis/Light.png";
import Dark from "../Utilis/Dark.png";
import TuneModal from "./Modals/TuneModal";

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const [isModal, setIsModal] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const logo = colorMode === "light" ? Light : Dark;

    return (
        <Box
            bg={useColorModeValue("gray.100", "gray.900")}
            px={4}
            boxShadow="lg">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ base: "block", md: "none" }}
                    onClick={onToggle}
                />
                <HStack spacing={8} alignItems="center" width="30%">
                    <ReactLink to="/">
                        <Image
                            width={{ base: "40%", md: "80%", lg: "10%" }}
                            margin={{ base: "auto", md: "0px" }}
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
                                aria-label="Options"
                                icon={<CgMoreVerticalAlt />}
                                rounded="full"
                                // variant="outline"
                            />
                            <MenuList>
                                <MenuItem icon={<AddIcon />}>New Todo</MenuItem>
                                <MenuItem icon={<QuestionIcon />}>FAQ</MenuItem>
                                <MenuItem
                                    icon={<SettingsIcon />}
                                    onClick={() => setIsModal(true)}>
                                    Settings
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Tooltip>
                </HStack>
                {isModal === true ? (
                    <TuneModal isModal={isModal} setIsModal={setIsModal} />
                ) : (
                    ""
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <Box pb={4} display={{ md: "none" }}>
                    <Stack spacing={4}></Stack>
                </Box>
            </Collapse>
        </Box>
    );
}
