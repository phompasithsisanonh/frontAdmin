import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Button,
  useToast,
  Select,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { FaPrint, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import Bar from "../LlistBar/Bar";
import ReactToPrint from "react-to-print";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuery,
  setQueryCategory,
  setPrice,
  setPage,
} from "../redux/listProducts";

// Default image path for missing images
const defaultImage = "";

const getStatusBackgroundColor = (status) => {
  switch (status) {
    case "sale":
      return "rgb(68, 255, 84)";
    default:
      return "white";
  }
};

function ListProducts() {
  const dispatch = useDispatch();
  const { limit, query, page, queryCategory, price } = useSelector(
    (state) => state.products
  );
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const [alerts, setAlerts] = useState([]);
  const toast = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/getProducts?page=${page}&limit=${limit}&price=${price}`
      );
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [page, limit, price, toast]);

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/alerts`);
      setAlerts(res.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    fetchProducts();
  }, [fetchAlerts, fetchProducts]);

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_URL}/deleteProductsController/${id}`
      );
      toast({
        title: "Product Deleted Successfully",
        description: "Product has been deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setProducts((prevData) =>
        prevData.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete product", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productsName.toLowerCase().includes(query.toLowerCase()) &&
      product.category.toLowerCase().includes(queryCategory.toLowerCase())
  );

  const ComponentTable = React.forwardRef((props, ref) => (
    <TableContainer width="100%" ref={ref}>
      <Table variant="simple" bg="gray.800" color="white">
        <TableCaption>
          Total Products: <strong>{total}</strong>
        </TableCaption>
        <Thead>
          <Tr>
            {[
              "#",
              "Product Code",
              "Category",
              "Product Name",
              "Image",
              "Quantity",
              "Price/Unit",
              "Size",
              "Status",
              "Admin",
              "Date",
              "Edit",
              "Delete",
            ].map((header) => (
              <Th key={header} textAlign="center">
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {filteredProducts.map((row, index) => (
            <Tr key={row._id}>
              <Td textAlign="center">{index + 1}</Td>
              <Td textAlign="center">{row.codeProducts}</Td>
              <Td textAlign="center">{row.category}</Td>
              <Td textAlign="center">{row.productsName}</Td>
              <Td textAlign="center">
                <img
                  src={
                    row.image
                      ? `http://localhost:8000${row.image}`
                      : defaultImage
                  }
                  alt={row.productsName || "Product Image"}
                  style={{ width: "70px", height: "70px" }}
                />
              </Td>
              <Td textAlign="center">{row.quantity}</Td>
              <Td textAlign="center">{row.price.toLocaleString()}</Td>
              <Td textAlign="center">{row.size}</Td>
              <Td textAlign="center" bg={getStatusBackgroundColor(row.status)}>
                {row.status}
              </Td>
              <Td textAlign="center">{row.admin || "N/A"}</Td>
              <Td textAlign="center">
                {new Date(row.date).toLocaleDateString()}
              </Td>
              <Td textAlign="center">
                <Button colorScheme="blue" variant="outline">
                  Edit
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  colorScheme="red"
                  onClick={() => deleteProduct(row._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ));

  return (
    <Flex direction={{ base: "column", md: "row" }} p={4}>
      <Bar />
      <Box flex="1" p="4">
        <Heading fontSize="2xl" mb="4">
          <FaClipboardList /> ລາຍການສິນຄ້າ
        </Heading>
        <Box mb="4">
          <Stack spacing={4}>
            <Stack direction="row" spacing={4}>
              <Box>
                <Box width={{ base: "100%", md: "200px" }}>
                  <Text mb="1">Category</Text>
                  <Select
                    id="category-select"
                    onChange={(e) => dispatch(setQueryCategory(e.target.value))}
                    value={queryCategory}
                  >
                    <option value="">Select Category</option>
                    <option value="shoe">Shoe</option>
                    <option value="clothes">Cloth</option>
                    <option value="trousers">Trousers</option>
                    <option value="hat">Hat</option>
                    <option value="bag">Bag</option>
                    <option value="ornament">Ornament</option>
                  </Select>
                </Box>
              </Box>
              <Box>
                <Text mb="1">Price</Text>
                <Select
                  id="price-select"
                  onChange={(e) => dispatch(setPrice(e.target.value))}
                  value={price}
                >
                  <option value="">Select Price</option>
                  <option value="0-100000">0-100,000</option>
                  <option value="100000-500000">100,000-500,000</option>
                  <option value="500000-1000000">500,000-1,000,000</option>
                  <option value="1000000">1,000,000+</option>
                </Select>
              </Box>
              <Box width={{ base: "100%", md: "330px" }}>
                <Text mb="2" fontWeight="bold">
                  Search
                </Text>
                <Input
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                  value={query}
                  placeholder="Search Product Name"
                />
              </Box>
            </Stack>
            <Box>
              <ReactToPrint
                trigger={() => (
                  <Button
                    colorScheme="blue"
                    leftIcon={<FaPrint />}
                    aria-label="Print"
                  >
                    Print
                  </Button>
                )}
                content={() => componentRef.current}
              />
            </Box>
            <Stack direction={{ base: "column", md: "row" }} p={4}>
              <Box pl="8">
                <Heading fontSize="2xl" mb="4">
                  ລາຍການສິນຄ້າ
                </Heading>
                <ComponentTable ref={componentRef} />
              </Box>

              <Box pl="8">
                <Heading size="md">Low Stock Products</Heading>
                <TableContainer width="100%">
                  <Table
                    variant="simple"
                    bg="gray.800"
                    color="white"
                    borderRadius="md"
                    width="100%"
                  >
                    <Thead>
                      <Tr>
                        {[
                          "#",
                          "Category",
                          "Product Name",
                          "Image",
                          "Quantity",
                          "Product Code",
                        ].map((header) => (
                          <Th key={header} textAlign="center">
                            {header}
                          </Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {loading ? (
                        <Tr>
                          <Td colSpan={15} textAlign="center">
                            <Spinner size="lg" color="teal.500" />
                          </Td>
                        </Tr>
                      ) : alerts.length > 0 ? (
                        alerts.map((alert, index) => (
                          <Tr key={alert._id}>
                            <Td textAlign="center">{index + 1}</Td>
                            <Td textAlign="center">
                              {alert.category || "N/A"}
                            </Td>
                            <Td textAlign="center">{alert.productsName}</Td>
                            <Td textAlign="center">
                              <img
                                src={
                                  alert.image
                                    ? `http://localhost:8000${alert.image}`
                                    : defaultImage
                                }
                                alt={alert.productsName || "Alert Image"}
                                style={{ width: "70px", height: "70px" }}
                              />
                            </Td>
                            <Td textAlign="center">{alert.quantity}</Td>
                            <Td textAlign="center">{alert.codeProducts}</Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr>
                          <Td colSpan={6} textAlign="center">
                            <Text fontSize="lg" color="red">
                              No Data Available
                            </Text>
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box display="flex" justifyContent="center" mb="4">
          <Button
            colorScheme="teal"
            onClick={() => dispatch(setPage(page + 1))}
            disabled={page >= Math.ceil(total / limit)}
          >
            Next
          </Button>
          <Button
            colorScheme="teal"
            ml="2"
            onClick={() => dispatch(setPage(page - 1))}
            disabled={page <= 1}
          >
            Previous
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default ListProducts;
