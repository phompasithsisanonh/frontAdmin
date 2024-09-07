import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Switch,
  Button,
  Input,
  Select,
  Flex,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import Bar from "../../LlistBar/Bar";

function StatusProducts() {
  const [createData, setCreateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customerID, setCustomerID] = useState("");
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const toast = useToast();

  const handlePageChange = (direction) => {
    setPage((prevPage) =>
      Math.max(1, Math.min(prevPage + direction, Math.ceil(total / limit)))
    );
  };

  const handleInputChange = (event) => setQuery(event.target.value);

  const filteredProducts = createData.filter((product) =>
    product.customerName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredList = createData.filter(
    (row) =>
      row.customerID &&
      row.customerID.includes(customerID) &&
      row.customerName.toLowerCase().includes(query.toLowerCase())
  );

  const updateOrderStatus = async (id, status) => {
    try {
      setIsLoading(true);
      await axios.patch(`${process.env.REACT_APP_URL}/updateStatus/${id}`, {
        status,
      });
      setCreateData((prevData) =>
        prevData.map((item) => (item._id === id ? { ...item, status } : item))
      );
      toast({
        title: "Update Successful",
        description: "Status updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update status",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Failed to update order status", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrderController = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${process.env.REACT_APP_URL}/deleteOrderController/${id}`);
      toast({
        title: "Deleted Successfully",
        description: "Order deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCreateData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to delete order",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleOrder = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/getAllorder?page=${page}&limit=${limit}&customerID=${customerID}`
        );
        setCreateData(response.data.products || []);
        setTotal(response.data.total || 0);
        localStorage.setItem("totalOrder", response.data.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    handleOrder();
  }, [page, limit, customerID]);

  return (
    <Box display="flex" flexDirection="row" minHeight="100vh">
      <Bar />
      <Box flex="1" p={6}>
        <Heading
          width="100%"
          height="80px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="yellow.200"
          textAlign="center"
          mb={6}
          borderRadius="md"
          boxShadow="md"
          fontSize="2xl"
          fontWeight="bold"
        >
          ສະຖານະຂອງສິນຄ້າ
        </Heading>
        <Box mb={6} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
          <Stack spacing={4}>
            <Stack direction="row" spacing={4} mb={4}>
              <Box width={{ base: "100%", md: "200px" }}>
                <Text mb="2" fontWeight="bold">Customer ID</Text>
                <Select
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                  placeholder="Select Customer ID"
                >
                  {filteredProducts.map((row, index) => (
                    <option key={index} value={row.customerID}>
                      {row.customerID}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box width={{ base: "100%", md: "330px" }}>
                <Text mb="2" fontWeight="bold">Search</Text>
                <Input
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search by Name"
                />
              </Box>
            </Stack>

            <TableContainer>
              <Text fontSize="lg" mb="4" fontWeight="bold">
                Total Count: <strong>{total}</strong>
              </Text>
              <Table variant="striped" colorScheme="teal" size="md">
                <Thead>
                  <Tr>
                    {[
                      "No.",
                      "Customer ID",
                      "Customer Name",
                      "Product Name",
                      "Phone",
                      "Address",
                      "Delivery Method",
                      "Payment Method",
                      "Quantity",
                      "Price",
                      "Total Amount",
                      "Status",
                      "Update Status",
                      "Ship",
                      "Delete",
                    ].map((header) => (
                      <Th key={header} textAlign="center" color="gray.600" fontWeight="bold">
                        {header}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={15} textAlign="center">
                        <Spinner size="lg" color="teal.500" />
                      </Td>
                    </Tr>
                  ) : filteredList.length > 0 ? (
                    filteredList.map((row, index) => (
                      <Tr key={row._id} _even={{ bg: "gray.50" }} _hover={{ bg: "gray.100" }}>
                        <Td textAlign="center">{index + 1}</Td>
                        <Td textAlign="center">{row.customerID}</Td>
                        <Td textAlign="center">{row.customerName}</Td>
                        <Td textAlign="center">{row.productsName}</Td>
                        <Td textAlign="center">{row.tel}</Td>
                        <Td textAlign="center">{row.address}</Td>
                        <Td textAlign="center">Authorized</Td>
                        <Td textAlign="center">{row.pay}</Td>
                        <Td textAlign="center">{row.quantity}</Td>
                        <Td textAlign="center">{row.price}</Td>
                        <Td textAlign="center">200,000</Td>
                        <Td textAlign="center">{row.status}</Td>
                        <Td textAlign="center">
                          <Switch
                            colorScheme="red"
                            isChecked={row.status === "Processing"}
                            onChange={(e) =>
                              updateOrderStatus(
                                row._id,
                                e.target.checked ? "Processing" : "Not Process"
                              )
                            }
                          />
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="blue"
                            isChecked={row.status === "Processing"}
                            onClick={() =>
                              updateOrderStatus(row._id, "Shipped","Processing")
                            }
                          >
                            Ship
                          </Button>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="red"
                            onClick={() => deleteOrderController(row._id)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={15} textAlign="center">
                        <Text fontSize="lg" color="red.500" fontWeight="bold">
                          No Data Available
                        </Text>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>

            <Flex justify="flex-end" mt={4}>
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={() => handlePageChange(-1)}
                isDisabled={page === 1}
                aria-label="Previous Page"
                mr={2}
                colorScheme="teal"
                variant="outline"
              />
              <Text mx={2} fontWeight="bold">
                Page {page} of {Math.ceil(total / limit)}
              </Text>
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={() => handlePageChange(1)}
                isDisabled={page === Math.ceil(total / limit)}
                aria-label="Next Page"
                colorScheme="teal"
                variant="outline"
              />
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default StatusProducts;
