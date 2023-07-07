import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    VStack,
    Modal,
} from "@chakra-ui/react";
import AudioPlayer from "react-audio-player";

const Modals = ({ isModal, setIsModal }) => {
    const [selectedRingtone, setSelectedRingtone] = useState("");
    const ringtones = [
        { name: "Ambulance", src: "../Utilis/Tunes/Ambulance.ogg" },
        { name: "Ringtone 2", src: "path/to/ringtone2.mp3" },
        { name: "Ringtone 3", src: "path/to/ringtone3.mp3" },
    ];

    const handleCheckboxChange = (value) => {
        setSelectedRingtone(value);
    };

    const handleClose = () => {
        setIsModal(false);
    };

    const handleAudioPlay = () => {
        // Perform any necessary logic before playing the audio
    };

    return (
        <Modal
            isCentered
            isOpen={isModal}
            onClose={handleClose}
            scrollBehavior="inside"
            motionPreset="slideInBottom">
            <ModalOverlay backdropFilter="blur(5px)" />
            <ModalContent rounded="2xl">
                <ModalHeader>Settings</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Ringtone</FormLabel>
                        <RadioGroup
                            value={selectedRingtone}
                            onChange={handleCheckboxChange}>
                            <VStack spacing="4" align="left">
                                {ringtones.map((ringtone) => (
                                    <Radio
                                        key={ringtone.name}
                                        value={ringtone.src}>
                                        {ringtone.name}
                                    </Radio>
                                ))}
                            </VStack>
                        </RadioGroup>
                        <FormHelperText fontStyle="italic">
                            Ringtone is set to '{selectedRingtone}'
                        </FormHelperText>
                    </FormControl>
                    <Box mt={4}>
                        {selectedRingtone && (
                            <AudioPlayer
                                src={selectedRingtone}
                                onPlay={handleAudioPlay}
                                controls
                                autoPlay
                            />
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter
                    w="50%"
                    m="auto"
                    display="flex"
                    justifyContent="space-between">
                    <Button
                        variant="outline"
                        colorScheme="green"
                        rounded="2xl"
                        onClick={handleClose}>
                        Save
                    </Button>
                    <Button variant="ghost" rounded="2xl" onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Modals;
