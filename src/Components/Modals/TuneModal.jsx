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

const TuneModal = ({ isModal, setIsModal }) => {
    const ringtones = [
        {
            name: "Alarm Clock",
            src: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
        },
        {
            name: "Bugle Tune",
            src: "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg",
        },
        {
            name: "Digital Watch Alarm Long",
            src: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
        },
        {
            name: "Dinner Bell Triangle",
            src: "https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg",
        },
        {
            name: "Dosimeter Alarm",
            src: "https://actions.google.com/sounds/v1/alarms/dosimeter_alarm.ogg",
        },
        {
            name: "Mechanical Clock Ring",
            src: "https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg",
        },
        {
            name: "Medium Bell Ringing Near",
            src: "https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg",
        },

        {
            name: "Radiation Meter",
            src: "https://actions.google.com/sounds/v1/alarms/radiation_meter.ogg",
        },
        {
            name: "Setting Alarm Clock",
            src: "https://actions.google.com/sounds/v1/alarms/setting_alarm_clock.ogg",
        },
        {
            name: "Spaceship Alarm",
            src: "https://actions.google.com/sounds/v1/alarms/spaceship_alarm.ogg",
        },
    ];
    const [selectedRingtone, setSelectedRingtone] = useState(ringtones[0].src);

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
            size="xs"
            height="40vh"
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
                        <FormLabel>Tunes</FormLabel>
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
                                // controls
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

export default TuneModal;
