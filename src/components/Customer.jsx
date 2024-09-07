import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Bar from "../LlistBar/Bar";

function Customer() {
  const [createData, setCreateData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [customerID, setCustomerID] = useState("");
  const limit = 5;
  const toast = useToast();


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredProducts = createData.filter((product) =>
    product.customerName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredList = createData.filter(
    (row) =>
      row.customerID &&
      row.customerID.includes(customerID) &&
      row.customerName.toLowerCase().includes(query.toLowerCase())
  );

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "customer":
        return "green.200";
      case "creditors":
        return "pink.200";
      case "debtors":
        return "blue.200";
      default:
        return "white";
    }
  };

  const Delete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/deleteCustomer/${id}`
      );
      toast({
        title: "Customer Deleted Successfully",
        description: "The customer has been removed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCreateData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      console.error("customer failed", error);
      toast({
        title: "Error",
        description: "Failed to delete customer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCustomer = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/getCustomer?page=${page}&limit=${limit}&customerID=${customerID}`
        );
        setCreateData(res.data.products);
        setTotal(res.data.total);
      } catch (error) {
        console.error("customer failed", error);
      }
      setLoading(false);
    };
    getCustomer();
  }, [page, customerID]);

  return (
    <Box display="flex" flexDirection="row" flex="1">
      <Bar />
      <Box flex="1" p="4">
        <Heading mb="8" textAlign="center" bg="yellow.400" p="4">
          ລາຍການລູກຄ້າ
        </Heading>
        <Box mb="4" p="4">
          <Stack spacing={4}>
            <Stack direction="row" spacing={4}>
              <Box flex="1">
                <Text mb="2">ລະຫັດລູກຄ້າ</Text>
                <Select
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                >
                  {filteredProducts.map((row, index) => (
                    <option key={index} value={row.customerID}>
                      {row.customerID}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box flex="1">
                <Text mb="2">ທັງໝົດ</Text>
                <Select
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                >
                  <option value="">ເລືອກປະເພດທັງໝົດ</option>
                  <option value="">ທັງໝົດ</option>
                </Select>
              </Box>
              <Box flex="2">
                <Text mb="2">ຄົ້ນຫາ</Text>
                <Input
                  onChange={handleInputChange}
                  value={query}
                  placeholder="ຊື່ລູກຄ້າ"
                />
              </Box>
            </Stack>
          </Stack>

          <TableContainer
            mt="4"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
          >
            <Text fontSize="lg" mb="4">
              ຈຳນວນລູກຄ້າທັງໝົດ: <strong>{total}</strong>
            </Text>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign="center">ລຳດັບ</Th>
                  <Th textAlign="center">ຊື່ລູກຄ້າ</Th>
                  <Th textAlign="center">ລະຫັດລູກຄ້າ</Th>
                  <Th textAlign="center">ເບີໂທລະສັບ</Th>
                  <Th textAlign="center">ທີ່ຢູ່ລູກຄ້າ</Th>
                  <Th textAlign="center">ສະຖານະ</Th>
                  <Th textAlign="center">ແກ້ໄຂ</Th>
                  <Th textAlign="center">ລົບອອກ</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredList.length > 0 ? (
                  filteredList.map((row, index) => (
                    <Tr key={index}>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td textAlign="center">{row.customerName}</Td>
                      <Td textAlign="center">{row.customerID}</Td>
                      <Td textAlign="center">{row.tel}</Td>
                      <Td textAlign="center">{row.address}</Td>
                      <Td textAlign="center">
                        <Box
                          bg={getStatusBackgroundColor(row.status)}
                          color="black"
                          textAlign="center"
                          p="2"
                          borderRadius="md"
                          borderWidth="1px"
                        >
                          {row.status}
                        </Box>
                      </Td>
                      <Td textAlign="center">
                        <Button
                          colorScheme="blue"
                          onClick={() =>
                            alert("Edit functionality not implemented")
                          }
                        >
                          ແກ້ໄຂ
                        </Button>
                      </Td>
                      <Td textAlign="center">
                        <Button
                          colorScheme="red"
                          onClick={() => Delete(row._id)}
                        >
                          ລົບອອກ
                        </Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="8" textAlign="center">
                      <Text>ບໍ່ມີຂໍ້ມູນ</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <Box
            display="flex"
            paddingTop={"6px"}
            justifyContent="flex-end"
            mb="4"
          >
            <Button
              colorScheme="teal"
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / limit)}
            >
              Next
            </Button>
            <Button
              colorScheme="teal"
              ml="2"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
          </Box>
          {/* <Box mt="4" display="flex" justifyContent="flex-end">
            <Pagination
              count={Math.ceil(total / limit)}
              page={page}
              onChange={handlePageChange}
              colorScheme="teal"
            />
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Customer;
