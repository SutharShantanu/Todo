/* eslint-disable no-undef */
import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useColorModeValue,
    Spinner,
    Highlight,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteTodos } from "../Redux/Todo/Action";

const Alert = ({ isAlert, setIsAlert, title, id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(deleteTodos(id));
            setIsLoading(false);
        }, 2000);
    };

    return (
        <>
            <AlertDialog
                motionPreset="slideInBottom"
                size={{ base: "xs", md: "sm" }}
                isOpen={isAlert}
                onClose={() => setIsAlert(false)}
                isCentered>
                <AlertDialogOverlay backdropFilter="blur(5px)" />
                <AlertDialogContent rounded="2xl">
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete{" "}
                        <Highlight
                            query={title}
                            styles={{
                                px: "2",
                                py: "1",
                                rounded: "2xl",
                                bg: "red.400",
                                color: "white",
                                fontStyle: "italic",
                            }}>
                            {title}
                        </Highlight>{" "}
                        from your Todos?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            fontWeight="normal"
                            variant="solid"
                            rounded="2xl"
                            onClick={() => setIsAlert(false)}
                            isDisabled={isLoading}>
                            No
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme="red"
                            fontWeight="normal"
                            rounded="2xl"
                            ml={3}
                            onClick={handleDelete}
                            isLoading={isLoading}
                            loadingText="Deleting"
                            spinner={
                                <Spinner
                                    color={useColorModeValue("black", "white")}
                                    size="xs"
                                />
                            }>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Alert;
