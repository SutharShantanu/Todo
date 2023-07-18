import React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react";
import { PiCodesandboxLogoLight } from "react-icons/pi";
import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialLinkedin } from "react-icons/sl";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      p={2}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease-in-out"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      width="100%"
      position={"sticky"}
      bottom={0}
      mt={12}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align="center"
      >
        <Text>© 2023 Shantanu. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"GitHub"}
            href={"https://github.com/SutharShantanu"}
          >
            <VscGithubAlt />
          </SocialButton>
          <SocialButton
            label={"LinkedIn"}
            href={"https://www.linkedin.com/in/shantanu-suthar-8347031ab/"}
          >
            <SlSocialLinkedin />
          </SocialButton>
          <SocialButton
            label={"CodeSandBox"}
            href={"https://codesandbox.io/u/SutharShantanu"}
          >
            <PiCodesandboxLogoLight />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
