/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Flex,
  Heading,
  Highlight,
  IconButton,
  Input,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import TodoCard from "../Components/TodoCard";
import AddModal from "../Components/Modals/AddModal";
import { AddIcon } from "@chakra-ui/icons";
import { getTodo } from "../Redux/Todo/Action";
import Charts from "../Components/Charts";
import Error from "../Components/Error";
import { Cards, Header, SkeletonCards } from "../Components/Skeletons";

const Todo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { todo } = useSelector((state) => state.TodoReducer);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  let length = todo ? todo.length.toString() : "0";

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(getTodo());
      setIsLoading(false);
    }, 2000);
  }, [dispatch]);

  const filteredTodo = todo.filter((item) => {
    if (selectedTag === "all" && searchQuery === "") {
      return true;
    } else if (selectedTag === "pending") {
      return item.status === "pending" && item.title.includes(searchQuery);
    } else if (selectedTag === "completed") {
      return item.status === "completed" && item.title.includes(searchQuery);
    } else {
      return item.title.includes(searchQuery);
    }
  });

  const handleTagClick = (tag) => {
    setIsFilterLoading(true);
    setSelectedTag(tag);

    setTimeout(() => {
      setIsFilterLoading(false);
    }, 2000);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const pendingTodo = todo.filter((ele) => ele.status === "pending").length;

  const completedTodo = todo.filter((ele) => ele.status === "completed").length;

  const pieData = {
    values: [pendingTodo, completedTodo]
  };

  return (
    <Box bg={useColorModeValue("white", "gray.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        {isLoading ? (
          <Header />
        ) : (
          <Stack spacing={0} align={"center"}>
            <Heading
              mt={{ base: 4, md: 8 }}
              as={"h1"}
              size={{ base: "2xl", md: "4xl" }}
            >
              Your Todos&nbsp;
              <Highlight
                query={length}
                styles={{
                  px: "2",
                  py: "1",
                  rounded: "2xl",
                  bg: "orange.200"
                }}
              >
                {length}
              </Highlight>
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} mt={2} color={"gray.500"}>
              Todo that helps to manage your life
            </Text>
          </Stack>
        )}
      </Container>
      {isLoading ? (
        <SkeletonCards />
      ) : (
        <Box
          w="80%"
          m="auto"
          boxShadow="md"
          rounded="2xl"
          py="4"
          mb={20}
          bg={useColorModeValue("gray.200", "gray.900")}
        >
          <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            bg={useColorModeValue("gray.200", "gray.900")}
            spacing={8}
            my="4"
          >
            <Box w={{ base: "90%", md: "60%" }} mx="auto" mt="0">
              <Flex
                justifyContent="space-between"
                flexDirection={{ base: "column", md: "row" }}
              >
                <Flex
                  justifyContent="space-between"
                  w={{ base: "100%", md: "40%" }}
                >
                  <Tag
                    size={{ base: "md", md: "lg" }}
                    boxShadow="md"
                    borderRadius="full"
                    colorScheme={selectedTag === "all" ? "green" : undefined}
                    cursor="pointer"
                    onClick={() => handleTagClick("all")}
                  >
                    <TagLabel>All</TagLabel>
                  </Tag>
                  <Tag
                    size={{ base: "md", md: "lg" }}
                    borderRadius="full"
                    boxShadow="md"
                    colorScheme={
                      selectedTag === "pending" ? "green" : undefined
                    }
                    cursor="pointer"
                    onClick={() => handleTagClick("pending")}
                  >
                    <TagLabel>Pending</TagLabel>
                  </Tag>
                  <Tag
                    size={{ base: "md", md: "lg" }}
                    borderRadius="full"
                    boxShadow="md"
                    colorScheme={
                      selectedTag === "completed" ? "green" : undefined
                    }
                    cursor="pointer"
                    onClick={() => handleTagClick("completed")}
                  >
                    <TagLabel>Completed</TagLabel>
                  </Tag>
                </Flex>
                <Flex
                  spacing={2}
                  mt={{ base: 4, md: 0 }}
                  justifyContent="space-between"
                  w={{ base: "100%", md: "45%" }}
                >
                  <Input
                    w="70%"
                    type="search"
                    placeholder="Search here"
                    transition="all .3s ease-in-out"
                    boxShadow="md"
                    rounded="2xl"
                    bg={useColorModeValue("white", "gray.700")}
                    _focusVisible={{
                      outline: "none"
                    }}
                    onChange={handleSearch}
                  />
                  <Tooltip hasArrow label="New Todo" bg="white" color="#323234">
                    <IconButton
                      boxShadow="md"
                      rounded="full"
                      colorScheme="green"
                      onClick={onOpen}
                      icon={<AddIcon />}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
              {isOpen && <AddModal isOpen={isOpen} onClose={onClose} />}
              {isFilterLoading ? (
                <Cards />
              ) : filteredTodo.length === 0 ? (
                <Error />
              ) : isLoading ? (
                <SkeletonCards />
              ) : (
                filteredTodo.map((ele) => <TodoCard key={ele.id} {...ele} />)
              )}
            </Box>
            <Box
              bg={useColorModeValue("gray.200", "gray.900")}
              w={{ base: "100%", md: "35%" }}
              mx="auto"
            >
              <Heading
                as="h3"
                size="lg"
                textAlign="center"
                mt={{ base: 4, md: 0 }}
              >
                Stats
              </Heading>
              {filteredTodo.length !== 0 ? <Charts data={pieData} /> : null}
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Todo;
