import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  Select,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { RiAdminLine } from "react-icons/ri";
import Bar from "../LlistBar/Bar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AdminAdd() {
  const navigate = useNavigate();
  const toast = useToast();

  const [status, setStatus] = useState("admin");
  const [email, setEmail] = useState("");
  const [passwordID, setPasswordID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");

  const handleAdmin = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/register`, {
        email,
        password,
        passwordID,
        status,
        firstName,
        tel,
      });
      Swal.fire({
        title: "ເພີ່ມແອດມິນສຳເລັດ",
        text: "Good job!",
        icon: "success",
        confirmButtonText: "ປິດ",
      });
      navigate("/adminAdd");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "ເກີດຂໍ້ຜິດຜາດ",
        icon: "error",
        confirmButtonText: "ປິດ",
      });
      console.error("Registration failed", error);
    }
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} p={4}>
      <Bar />
      <Box flex="1" p={6}>
        <Heading
          mb={6}
          fontSize="2xl"
          textAlign="center"
          color="teal.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <RiAdminLine size="24px" /> ເພີ່ມແອດມິນ
        </Heading>

        <Button
          colorScheme="blue"
          mb={6}
          onClick={() => navigate("/customerAdd")}
        >
          ເພີ່ມລູກຄ້າ
        </Button>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <Stack spacing={4} direction={{ base: "column", md: "row" }}>
                <Box flex="1">
                  <Input
                    placeholder="ລະຫັດ ID"
                    value={passwordID}
                    onChange={(e) => setPasswordID(e.target.value)}
                  />
                </Box>
                <Box flex="1">
                  <Input
                    placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Box>
                <Box flex="1">
                  <Select
                    placeholder="ເລືອກປະເພດ"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="admin">ແອດມິນ</option>
                    <option value="user">ຜູ້ໃຊ້ງານ</option>
                    <option value="rider">Rider</option>
                  </Select>
                </Box>
              </Stack>

              <Stack spacing={4} direction={{ base: "column", md: "row" }}>
                <Box flex="1">
                  <Input
                    placeholder="ອິເມວ"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box flex="1">
                  <Input
                    placeholder="ເບີໂທລະສັບ"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
                </Box>
                <Box flex="1">
                  <Input
                    placeholder="ລະຫັດຜ່ານ"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
              </Stack>

              <Button
                colorScheme="teal"
                onClick={handleAdmin}
                size="lg"
                mt={4}
                alignSelf="flex-end"
              >
                ບັນທືກ
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}

export default AdminAdd;
