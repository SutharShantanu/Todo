import { CheckCircleIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    HStack,
    Flex,
} from "@chakra-ui/react";

export default function TodoCard() {
    return (
        <Flex
            position="relative"
            w="full"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="md"
            rounded="2xl"
            my={12}
            p={6}
            justifyContent="space-between"
            spacing={4}>
            <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: "translate(-50%)" }}>
                <Badge
                    variant="subtle"
                    // colorScheme="red"
                    bg={useColorModeValue("red.100", "red.200")}
                    color="#1d1d1f"
                    fontWeight={"thin"}
                    px={2}
                    py={1}
                    rounded={"full"}>
                    Pending
                </Badge>
            </Box>
            <Heading fontSize={"4xl"} fontFamily={"body"} w="40%">
                Juice Drink
            </Heading>
            <HStack w="60%" justifyContent={"space-between"}>
                <Button
                    fontWeight={"thin"}
                    fontSize={"sm"}
                    rounded={"full"}
                    leftIcon={<EditIcon />}
                    _focus={{
                        bg: "gray.200",
                    }}>
                    Edit
                </Button>
                <Button
                    fontSize={"sm"}
                    fontWeight={"thin"}
                    rounded={"full"}
                    bg={"red.300"}
                    color={"white"}
                    leftIcon={<DeleteIcon />}
                    boxShadow={
                        "0px 1px 25px -5px rgb(225 66 66 / 48%), 0 10px 10px -5px rgb(225 66 66 / 43%)"
                    }
                    _hover={{
                        bg: "red.400",
                    }}
                    _focus={{
                        bg: "red.400",
                    }}>
                    Delete
                </Button>
                <Button
                    fontSize={"sm"}
                    rounded={"full"}
                    fontWeight={"thin"}
                    bg={"blue.400"}
                    color={"white"}
                    leftIcon={<CheckCircleIcon />}
                    boxShadow={
                        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                    }
                    _hover={{
                        bg: "blue.500",
                    }}
                    _focus={{
                        bg: "blue.500",
                    }}>
                    Completed
                </Button>
            </HStack>
        </Flex>
    );
}
