import React, { useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Button,
  Input,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import Bar from "../LlistBar/Bar";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const decoded = localStorage.getItem("token");
  const [email, setEmail] = useState(user.user?.email || "");
  const [firstName, setFirstName] = useState(user.user?.firstName || "");
  const [passwordID, setPasswordID] = useState(user.user?.passwordID || "");
  const [status, setStatus] = useState(user.user?.status || "");
  const [tel, setTel] = useState(user.user?.tel || "");
  const [isdisper, setIsdisper] = useState(false);
  const toast = useToast();

  const handleClickProfile = async () => {
    try {
      setIsdisper(true);
      const res = await axios.post(
        "https://backend-admin-nu.vercel.app/api/v1/products/updateController",
        {
          email,
          firstName,
          passwordID,
          status,
          tel,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${decoded}`, // Correct the Authorization header
          },
        }
      );
      console.log(res);
      const Jstring = JSON.stringify(res.data);
      localStorage.setItem("user", Jstring);
      toast({
        title: "Update Successful",
        description: "Profile updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(err);
    }
    setIsdisper(false);
  };

  return (
    <Flex minHeight="100vh">
      <Bar />
      <Box flex="1" p={5} bg="gray.100">
        <Heading
          textAlign="center"
          mb={8}
          p={4}
          bg="yellow.300"
          borderRadius="md"
          boxShadow="md"
        >
          ໂປຣໄຟລ
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} spacing={5}>
          <Box
            flex="1"
            p={5}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
          >
            <img
              src="profile-picture-url.jpg"
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #E2E8F0",
              }}
            />
            <Text fontSize="xl" fontWeight="bold" mt={3}>
              {firstName || "John Doe"}
            </Text>
            <Text mt={2} color="gray.600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum.
            </Text>
          </Box>
          <Box flex="2" p={5}>
            <Stack spacing={5}>
              <Stack spacing={4}>
                <Flex direction={{ base: "column", md: "row" }} gap={4}>
                  <Box flex="1">
                    <Text mb={1} fontWeight="bold">
                      ຊື່ແລະ ນາມສະກຸນ:
                    </Text>
                    <Input
    
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      borderRadius="md"
                    />
                  </Box>
                  <Box flex="1">
                    <Text mb={1} fontWeight="bold">
                      ລະຫັດ:
                    </Text>
                    <Input
                      type="password"
                      isDisabled={!isdisper}
                      onChange={(e) => setPasswordID(e.target.value)}
                      value={passwordID}
                      borderRadius="md"
                    />
                  </Box>
                </Flex>
                <Flex direction={{ base: "column", md: "row" }} gap={4}>
                  <Box flex="1">
                    <Text mb={1} fontWeight="bold">
                      ອິເມວ ຫຼື ເບີໂທລະສັບ:
                    </Text>
                    <Input
                      isDisabled={!isdisper}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      borderRadius="md"
                    />
                  </Box>
                  <Box flex="1">
                    <Text mb={1} fontWeight="bold">
                      ສະຖານະ:
                    </Text>
                    <Input
                      isDisabled={!isdisper}
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      borderRadius="md"
                    />
                  </Box>
                </Flex>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    ເບີໂທລະສັບ:
                  </Text>
                  <Input
                    onChange={(e) => setTel(e.target.value)}
                    value={tel}
                    borderRadius="md"
                  />
                </Box>
              </Stack>
              <Flex justify="flex-end" gap={4}>
                <Button colorScheme="teal" onClick={handleClickProfile}>
                  ອັບເດດໂປລໄຟລ
                </Button>
                <Button colorScheme="blue">
                  ປ່ຽນລະຫັດຜໍ່ານ
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Profile;
