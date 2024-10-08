import React, { useState } from "react";
import { Heading, Stack, Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      const Jstring = JSON.stringify(response.data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", Jstring);
      Swal.fire({
        title: "ບິນດີຕ້ອນຮັບທ່ານ ແອດມີນ",
        text: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
        icon: "success",
        confirmButtonText: "ປິດ",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "ບໍ່ຖືກຕ້ອງ ກະລຸນາລ໋ອກອິນໃໝ່",
        text: "ລະຫັດຜ່ານ ຫຼື ອິວເມວບໍ່ຖືກຕ້ອງ",
        icon: "error",
        confirmButtonText: "ປິດ",
      });
      console.error("Login failed", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="gray.50"
    >
      <Stack
        spacing={6}
        padding={8}
        borderRadius="md"
        boxShadow="md"
        bg="white"
        width={{ base: "90%", sm: "400px" }}
      >
        <Heading textAlign="center" size="lg">
          ເຂົ້າສູ່ລະບົບ
        </Heading>
        <FormControl id="email">
          <FormLabel>ເບີໂທລະສັບ</FormLabel>
          <Input
            type="text"
            placeholder="ເບີໂທລະສັບ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>ລະຫັດຜໍ່ານ</FormLabel>
          <Input
            type="password"
            placeholder="ລະຫັດຜໍ່ານ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderRadius="md"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleLogin}>
          ເຂົ້າສູ່ລະບົບ
        </Button>
      </Stack>
    </Box>
  );
}

export default SignIn;
