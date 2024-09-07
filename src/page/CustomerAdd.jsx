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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { RiCustomerService2Fill } from "react-icons/ri";
import Bar from "../LlistBar/Bar";
import axios from "axios";
import Swal from "sweetalert2";

function CustomerAdd() {
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("customer");
  const decoded = localStorage.getItem("token");
  const toast = useToast();

  const handleCustomer = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/customer`,
        {
          customerName,
          customerID,
          tel,
          address,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${decoded}`,
          },
        }
      );
      Swal.fire({
        title: "ເພີ່ມລູກຄ້າສຳເລັດ",
        text: "Good job!",
        icon: "success",
        confirmButtonText: "ປິດ",
      });
      // Clear form fields after submission
      setCustomerName("");
      setCustomerID("");
      setTel("");
      setAddress("");
      setStatus("customer");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "ເກີດຂໍ້ຜິດຜາດ",
        icon: "error",
        confirmButtonText: "ປິດ",
      });
      console.error("Failed to add customer", error);
    }
  };

  return (
    <Flex>
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
          <RiCustomerService2Fill size="24px" /> ເພີ່ມລູກຄ້າ
        </Heading>

        <Stack spacing={4} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>ສະຖານະ</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="ເລືອກປະເພດ"
              >
                <option value="customer">ລູກຄ້າ</option>
                <option value="creditors">ເຈົ້າໜີ້</option>
                <option value="debtors">ລູກໜີ້</option>
              </Select>
            </FormControl>

            <Stack spacing={4} direction={{ base: "column", md: "row" }}>
              <FormControl>
                <FormLabel>ລະຫັດ ID</FormLabel>
                <Input
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                  placeholder="ລະຫັດ ID"
                />
              </FormControl>
              <FormControl>
                <FormLabel>ຊື່ ແລະ ນາມສະກຸນ</FormLabel>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                />
              </FormControl>
            </Stack>

            <Stack spacing={4} direction={{ base: "column", md: "row" }}>
              <FormControl>
                <FormLabel>ເບີໂທລະສັບ</FormLabel>
                <Input
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="ເບີໂທລະສັບ"
                />
              </FormControl>
              <FormControl>
                <FormLabel>ທີ່ຢູ່ລູກຄ້າ</FormLabel>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ທີ່ຢູ່ລູກຄ້າ"
                />
              </FormControl>
            </Stack>

            <Button
              colorScheme="teal"
              size="lg"
              mt={4}
              onClick={handleCustomer}
            >
              ບັນທືກ
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}

export default CustomerAdd;
