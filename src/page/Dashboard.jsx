import { Box, Heading, Input, Stack, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { BsBasket } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { PiChatsTeardropThin } from "react-icons/pi";
import "../style/Dashbord.css";
import Bar from "../LlistBar/Bar";
import axios from "axios";

function Dashboard(prop) {
  const [isLoading, setIsLoading] = useState(true);
  const [listGoods, setListGoods] = useState();
  const [historyCustomer, setHistoryCustomer] = useState([]);
  const [historyProducts, setHistoryProducts] = useState([]);
  const TotalOrder = localStorage.getItem("totalOrder");
  const totalCustomer = localStorage.getItem("totalCustomer");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const [customerRes, productsRes, goodsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/v1/products/historyCustomer"),
          axios.get("http://localhost:8000/api/v1/products/historyProducts"),
          axios.get("http://localhost:8000/api/v1/products/getProducts"),
        ]);
        setHistoryCustomer(customerRes.data.latestHistory);
        setHistoryProducts(productsRes.data.latestHistoryProducts);
        setListGoods(goodsRes.data.total);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Box display="flex">
      <Box>
        <Bar />
      </Box>
      <Box flex="1" p={4}>
        <Heading mb={4}>Dashboard</Heading>
        <Box display="flex" justifyContent="center" mb={4}>
          <Box textAlign="center">
            <label>Search</label>
            <Input placeholder="Search" />
          </Box>
        </Box>

        <Stack direction="row" spacing={8} mb={8}>
          <Box textAlign="center" p={4} borderWidth={1} borderRadius="md" flex="1" borderColor="gray.200" bg="white">
            <Heading mb={2}>{listGoods}</Heading>
            <Text>Stock</Text>
            <Box mt={2} fontSize="40px">
              <FaEye />
            </Box>
          </Box>
          <Box textAlign="center" p={4} borderWidth={1} borderRadius="md" flex="1" borderColor="gray.200" bg="white">
            <Heading mb={2}>{TotalOrder}</Heading>
            <Text>Sales</Text>
            <Box mt={2} fontSize="40px">
              <BsBasket />
            </Box>
          </Box>
          <Box textAlign="center" p={4} borderWidth={1} borderRadius="md" flex="1" borderColor="gray.200" bg="white">
            <Heading mb={2}>{totalCustomer}</Heading>
            <Text>Customer</Text>
            <Box mt={2} fontSize="40px">
              <PiChatsTeardropThin />
            </Box>
          </Box>
          <Box textAlign="center" p={4} borderWidth={1} borderRadius="md" flex="1" borderColor="gray.200" bg="white">
            <Heading mb={2}>1,500</Heading>
            <Text>Earning</Text>
            <Box mt={2} fontSize="40px">
              <GrMoney />
            </Box>
          </Box>
        </Stack>
        <Box display="flex" justifyContent="space-between">
          <Box flex="1" p={4}>
            <Heading mb={4}>Product History</Heading>
            <Box borderWidth={1} borderRadius="md" borderColor="gray.200" bg="white" p={4}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Product Name</Th>
                    <Th isNumeric>Category</Th>
                    <Th isNumeric>Quantity</Th>
                    <Th isNumeric>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={4}>
                        <Text>Loading...</Text>
                      </Td>
                    </Tr>
                  ) : historyProducts.length === 0 ? (
                    <Tr>
                      <Td colSpan={4}>
                        <Text>No recent products history available</Text>
                      </Td>
                    </Tr>
                  ) : (
                    historyProducts.map((row, index) => (
                      <Tr key={index}>
                        <Td>{row.productsName}</Td>
                        <Td isNumeric>{row.category}</Td>
                        <Td isNumeric>{row.quantity}</Td>
                        <Td isNumeric>{row.price}</Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          </Box>
          <Box flex="1" p={4}>
            <Heading mb={4}>Customer History</Heading>
            <Box borderWidth={1} borderRadius="md" borderColor="gray.200" bg="white" p={4}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Customer Name</Th>
                    <Th isNumeric>Telephone</Th>
                    <Th isNumeric>Address</Th>
                    <Th isNumeric>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={4}>
                        <Text>Loading...</Text>
                      </Td>
                    </Tr>
                  ) : historyCustomer.length === 0 ? (
                    <Tr>
                      <Td colSpan={4}>
                        <Text>No recent customer history available</Text>
                      </Td>
                    </Tr>
                  ) : (
                    historyCustomer.map((row, index) => (
                      <Tr key={index}>
                        <Td>{row.customerName}</Td>
                        <Td isNumeric>{row.tel}</Td>
                        <Td isNumeric>{row.address}</Td>
                        <Td isNumeric>{row.status}</Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
