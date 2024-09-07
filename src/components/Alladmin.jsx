import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Input,
  Select,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import Bar from "../LlistBar/Bar";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function Alladmin() {
  const [createData, setCreateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [passwordID, setPasswordID] = useState("");
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const limit = 5;
  const toast = useToast();

  const handlePageChange = (direction) => {
    setPage((prevPage) =>
      Math.max(1, Math.min(prevPage + direction, Math.ceil(total / limit)))
    );
  };

  const handleInputChange = (event) => setQuery(event.target.value);

  const filteredList = createData.filter(
    (row) =>
      (!passwordID || row.passwordID.includes(passwordID)) &&
      row.firstName.toLowerCase().includes(query.toLowerCase())
  );

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "admin":
        return "green.300";
      case "user":
        return "pink.300";
      case "rider":
        return "blue.300";
      default:
        return "gray.100";
    }
  };

  const Delete = async (id) => {
    setLoading(true);
    try {
      if (user.user._id === id) {
        toast({
          title: "Cannot Delete Your Account",
          description: "You cannot delete your own account.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.delete(
          `https://backend-admin-nu.vercel.app/api/v1/products/delete/${id}`
        );
        toast({
          title: "Delete Successful",
          description: "User deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCreateData((prevData) => prevData.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
    setLoading(false);
  };

  const handleBlock = async (id) => {
    setLoading(true);
    try {
      await axios.post(`https://backend-admin-nu.vercel.app/api/v1/products/blockUser/${id}`);
      toast({
        title: "Block Successful",
        description: "User blocked successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to block user", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCustomer = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://backend-admin-nu.vercel.app/api/v1/products/getAllAdmin?page=${page}&limit=${limit}&customerID=${passwordID}`
        );
        setCreateData(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
      setLoading(false);
    };
    getCustomer();
  }, [page, passwordID]);

  return (
    <Box display="flex">
      <Bar />
      <Box flex="1" p="4">
        <Heading
          width="100%"
          height="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="yellow.200"
          textAlign="center"
        >
          ລາຍການສິດ
        </Heading>
        <Box p="4" m="4">
          <Stack spacing={4}>
            <Stack direction="row" spacing={4}>
              <Box>
                <Text fontWeight="bold">ລະຫັດແອດມິນ</Text>
                <Select
                  value={passwordID}
                  onChange={(e) => setPasswordID(e.target.value)}
                  placeholder="ເລືອກລະຫັດປ່ອນ"
                >
                  {createData.map((row, index) => (
                    <option key={index} value={row.passwordID}>
                      {row.passwordID}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Text fontWeight="bold">ທັງໝົດ</Text>
                <Select
                  value={passwordID}
                  onChange={(e) => setPasswordID(e.target.value)}
                  placeholder="ເລືອກປະເພດທັງໝົດ"
                >
                  <option value="">ທັງໝົດ</option>
                </Select>
              </Box>
              <Box width="330px">
                <Text fontWeight="bold">ຄົ້ນຫາ</Text>
                <Input
                  onChange={handleInputChange}
                  value={query}
                  placeholder="ຊື່"
                />
              </Box>
            </Stack>

            <TableContainer
              mt="4"
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <Text fontSize="20px" p="4">
                ຈຳນວນບໍລິຫານທັງໝົດ: <strong>{total}</strong>
              </Text>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th textAlign="center">ລຳດັບ</Th>
                    <Th textAlign="center">ຊື່ບໍລິຫານ</Th>
                    <Th textAlign="center">ລະຫັດ ID</Th>
                    <Th textAlign="center">ສະຖານະ</Th>
                    <Th textAlign="center">ປິດ-user</Th>
                    <Th textAlign="center">ແກ້ໄຂ</Th>
                    <Th textAlign="center">ລົບອອກ</Th>
                  </Tr>
                </Thead>
                {filteredList.length > 0 ? (
                  <Tbody>
                    {filteredList.map((row, index) => (
                      <Tr key={index}>
                        <Td textAlign="center">{index + 1}</Td>
                        <Td textAlign="center">{row.firstName}</Td>
                        <Td textAlign="center">{row.passwordID}</Td>
                        <Td textAlign="center">
                          <Box
                            bg={getStatusBackgroundColor(row.status)}
                            textAlign="center"
                            borderRadius="md"
                            p="2"
                          >
                            {row.status}
                          </Box>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="teal"
                            onClick={() => handleBlock(row._id)}
                          >
                            Block
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="blue"
                            onClick={() => console.log("Edit", row._id)}
                          >
                            ກໍ່ແກ້
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="red"
                            onClick={() => Delete(row._id)}
                          >
                            ລົບ
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                ) : (
                  <Box textAlign="center" p="4">
                    <Text>ບໍ່ມີຂໍໍມູນ</Text>
                  </Box>
                )}
              </Table>
            </TableContainer>

            <Flex mt="4" align="center" justify="center">
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={() => handlePageChange(-1)}
                isDisabled={page === 1}
                aria-label="Previous Page"
              />
              <Text mx="4">
                Page {page} of {Math.ceil(total / limit)}
              </Text>
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={() => handlePageChange(1)}
                isDisabled={page === Math.ceil(total / limit)}
                aria-label="Next Page"
              />
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Alladmin;
