import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Button,
  Select,
  useToast,
  Flex,
  FormControl,
  FormLabel,
  Divider,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdBorderColor } from "react-icons/md";
import Bar from "../LlistBar/Bar";

function Order() {
  const [category, setCategory] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [status, setStatus] = useState("");
  const [productsName, setProductsName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dated, setDated] = useState("");
  const [pay, setPay] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [getCustomer, setGetCustomer] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(""); // New state for selected price

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredOptionsCustomer, setFilteredOptionsCustomer] = useState([]);
  const decoded = localStorage.getItem("token");
  const toast = useToast();

  const filterOptions = (value) => {
    const filtered = getData
      .filter((item) =>
        item.productsName.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({
        name: item.productsName,
        price: item.price, // Assuming each item has a price property
      }));
    setFilteredOptions(filtered);
  };

  const filterOptionsCustomer = (value) => {
    const filtered = getCustomer
      .filter((item) =>
        item.customerName.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({
        name: item.customerName,
        tel: item.tel,
        address: item.address,
      }));
    setFilteredOptionsCustomer(filtered);
  };

  const handleOrder = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.REACT_APP_URL}/order`,
        {
          category,
          customerID,
          status,
          productsName,
          tel,
          address,
          customerName,
          dated,
          price,
          pay,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${decoded}`,
          },
        }
      );
      toast({
        title: "Success",
        description: "Order placed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      resetForm();
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.error || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCategory("");
    setCustomerID("");
    setStatus("");
    setProductsName("");
    setTel("");
    setAddress("");
    setCustomerName("");
    setDated("");
    setPay("");
    setPrice("");
    setQuantity("");
  };

  useEffect(() => {
    const getAutocomplete = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}/autocomplete?autocomplete=${productsName}`
        );
        setGetData(data.autocompletefindModel);
        setGetCustomer(data.productsCustomer);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAutocomplete();
  }, [productsName]);

  return (
    <Flex direction="row" flex="1">
      <Bar />
      <Box flex="1" p={6}>
        <Heading
          mb={6}
          fontSize="2xl"
          textAlign="center"
          color="teal.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MdBorderColor size="24px" /> ສັ່ງສິນຄ້າ
        </Heading>
        <VStack spacing={6} align="stretch">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>ປະເພດສິນຄ້າ</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="ເລືອກ"
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="shoe">ເກີບ</option>
                <option value="clothse">ເສື້ອ</option>
                <option value="trousers">ໂສ້ງ</option>
                <option value="hat">ໝວກ</option>
                <option value="bag">ກະເປົາ</option>
                <option value="ornament">ເຄື່ອງປະດັບ</option>
              </Select>
            </FormControl>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <FormControl>
                <FormLabel>ລະຫັດລູກຄ້າ</FormLabel>
                <Select
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                  placeholder="ເລືອກ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                >
                  {getCustomer.map((row) => (
                    <option key={row.customerID} value={row.customerID}>
                      {row.customerID}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>ສະຖານະຈັດສົ່ງສິນຄ້າ</FormLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="ເລືອກ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                >
                  <option value="Not Process">ຍັງບໍ່ຈັດສົ່ງ</option>
                </Select>
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel>ຊື່ສິນຄ້າ</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  {/* Optional: add a search icon */}
                </InputLeftElement>
                <Input
                  value={productsName}
                  onChange={(e) => {
                    setProductsName(e.target.value);
                    filterOptions(e.target.value);
                  }}
                  placeholder="ຊື່ສິນຄ້າ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                />
              </InputGroup>
              {filteredOptions.length > 0 && productsName !== "" && (
                <List
                  borderWidth="1px"
                  borderRadius="md"
                  mt="2"
                  borderColor="gray.300"
                >
                  {filteredOptions.map((option) => (
                    <ListItem
                      key={option.name}
                      padding="2"
                      cursor="pointer"
                      onClick={() => {
                        setProductsName(option.name);
                        setPrice(option.price);
                        setSelectedPrice(option.price);
                        setFilteredOptions([]);
                      }}
                    >
                      {option.name} - {option.price}
                    </ListItem>
                  ))}
                </List>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>ຊື່ລູກຄ້າ</FormLabel>
              <Input
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  filterOptionsCustomer(e.target.value);
                }}
                placeholder="ຊື່ລູກຄ້າ"
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              />
              {filteredOptionsCustomer.length > 0 && customerName !== "" && (
                <List
                  borderWidth="1px"
                  borderRadius="md"
                  mt="2"
                  borderColor="gray.300"
                >
                  {filteredOptionsCustomer.map((option) => (
                    <ListItem
                      key={option.name}
                      padding="2"
                      cursor="pointer"
                      onClick={() => {
                        setCustomerName(option.name);
                        setTel(option.tel);
                        setAddress(option.address);
                        setFilteredOptionsCustomer([]);
                      }}
                    >
                      {option.name} - {option.tel}
                    </ListItem>
                  ))}
                </List>
              )}
            </FormControl>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <FormControl>
                <FormLabel>ທີ່ຢູ່ລູກຄ້າ</FormLabel>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ທີ່ຢູ່ລູກຄ້າ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>ວິທີການຊຳລະເງິນ</FormLabel>
                <Input
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                  placeholder="ວິທີການຊຳລະເງິນ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>ເບີໂທລະສັບລູກຄ້າ</FormLabel>
                <Input
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="ເບີໂທລະສັບລູກຄ້າ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <FormControl>
                <FormLabel>ຈຳນວນສິນຄ້າ</FormLabel>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="ທີ່ຢູ່ລູກຄ້າ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                />
              </FormControl>


              <FormControl>
                <FormLabel>ຈຳນວນສິນຄ້າ</FormLabel>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="ເບີໂທລະສັບລູກຄ້າ"
                  borderColor="gray.300"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{ borderColor: "teal.500" }}
                />
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>ວັນທີ່/ເດືອນ/ປີ ສັ່ງສິນຄ້າ</FormLabel>
              <Input
                value={dated}
                onChange={(e) => setDated(e.target.value)}
                type="date"
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4} pt="4" justifyContent="flex-end">
            <Button colorScheme="red" onClick={resetForm}>
              ຍົກເລີກ
            </Button>
            <Button
              colorScheme="teal"
              isLoading={isLoading}
              onClick={handleOrder}
            >
              ສັ່ງສິນຄ້າ
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Order;
