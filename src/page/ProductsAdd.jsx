import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  Button,
  useToast,
  Select,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import Bar from "../LlistBar/Bar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineProduct } from "react-icons/ai";
import {
  differenceInSeconds,
  intervalToDuration,
  formatDuration,
} from "date-fns";
// const [file, setFile] = useState(null);
// const onFileChange = (e) => {
//   setFile(e.target.files[0]);
// };
// formData.append("image", file);
function ProductsAdd() {
  const navigate = useNavigate();
  const toast = useToast();
  const [status, setStatus] = useState("admin");
  const [productsName, setProductsName] = useState("");
  const [nameAdmin, setNameAdmin] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [codeProducts, setCodeProducts] = useState("");
  const decoded = localStorage.getItem("token");
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");
  const [lowPrice, setLowPrice] = useState("");

  // Handle adding product
  const calculateTimeRemaining = (expirationDate) => {
    const now = new Date();
    const timeRemaining = new Date(expirationDate) - now;
    if (timeRemaining <= 0) return "Expired";
    const minutes = Math.floor(timeRemaining / (100 * 60));
    const seconds = Math.floor(((timeRemaining / 100) * 60) / 1000);
    return `${minutes} : ${seconds}`;
  };
  const handleAddProducts = async () => {
    try {
      if (
        !productsName ||
        !nameAdmin ||
        !date ||
        !price ||
        !category ||
        !quantity ||
        !size ||
        !codeProducts
      ) {
        setUploadError("Please fill out all required fields.");
        toast({
          title: "Error",
          description: uploadError,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setUploading(true);
      setUploadError("");
      const expiry = expirationDate;
      calculateTimeRemaining(expiry);
      const formData = new FormData();
      formData.append("productsName", productsName);
      formData.append("nameAdmin", nameAdmin);
      formData.append("date", date);
      formData.append("status", status);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("size", size);
      formData.append("codeProducts", codeProducts);
      formData.append("discountExpiry", expiry);
      formData.append("discount", discount);
      formData.append("lowPrice", lowPrice);
      // formData.append("image", file);
      await axios.post(
        `${process.env.REACT_APP_URL}/createProductController`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${decoded}`,
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Product added successfully.",
        icon: "success",
        confirmButtonText: "Close",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the product.",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error("Error adding product", error);
    } finally {
      setUploading(false);
    }
  };

  // Update countdown timer
  useEffect(() => {
    const interval = setInterval( async() => {
      await axios
        .delete(`${process.env.REACT_APP_URL}/deleteDiscount`)
        .then(() => {
          handleAddProducts();
        })
        .catch((error) => console.log("error removing expired discount"));
    });
    return () => clearInterval(interval);
  }, [expirationDate]);

  return (
    <Flex direction={{ base: "column", md: "row" }} p={4}>
      <Box width={{ base: "100%", md: "20%" }} mb={{ base: 4, md: 0 }}>
        <Bar />
      </Box>
      <Box flex="1" p={5}>
        <Heading
          mb={6}
          fontSize="2xl"
          textAlign="center"
          color="teal.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AiOutlineProduct size="24px" /> ເພີ່ມສິນຄ້າ
        </Heading>

        <Stack
          spacing={4}
          p={4}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Product Category</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select category"
              >
                <option value="shoe">Shoes</option>
                <option value="clothes">Clothes</option>
                <option value="trousers">Trousers</option>
                <option value="hat">Hat</option>
                <option value="bag">Bag</option>
                <option value="ornament">Ornament</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Status</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Select status"
              >
                <option value="sale">For Sale</option>
                <option value="not_sale">Not for Sale</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Size</FormLabel>
              <Select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Select size"
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </Select>
            </FormControl>
          </Stack>
          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <FormControl isRequired>
              <FormLabel>Product Code</FormLabel>
              <Input
                value={codeProducts}
                onChange={(e) => setCodeProducts(e.target.value)}
                placeholder="Product code"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                value={productsName}
                onChange={(e) => setProductsName(e.target.value)}
                placeholder="Product name"
              />
            </FormControl>
            {/* <FormControl isRequired>
              <FormLabel>Product Image</FormLabel>
              <Input
                type="file"
                onChange={onFileChange}
                accept="image/*"
              />
              {uploadError && <FormErrorMessage>{uploadError}</FormErrorMessage>}
            </FormControl> */}
            <FormControl isRequired>
              <FormLabel>Admin Name</FormLabel>
              <Input
                value={nameAdmin}
                onChange={(e) => setNameAdmin(e.target.value)}
                placeholder="Admin name"
              />
            </FormControl>
          </Stack>
          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <FormControl isRequired>
              <FormLabel>Date Added</FormLabel>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Product price"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="Product quantity"
              />
            </FormControl>
          </Stack>
          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <FormControl isRequired>
              <FormLabel>discount</FormLabel>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                placeholder="Discount"
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>expiryDate</FormLabel>
              <Input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                placeholder="Discount Expiry Date"
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>lowPrice</FormLabel>
              <Input
                type="Number"
                value={lowPrice}
                onChange={(e) => setLowPrice(e.target.value)}
                placeholder="lowPrice"
                required
              />
            </FormControl>
          </Stack>
          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <Button onClick={() => navigate("/")}>Cancel</Button>
            <Button
              onClick={handleAddProducts}
              colorScheme="teal"
              isLoading={uploading}
            >
              ເພີ່ມສິນຄ້າ
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}

export default ProductsAdd;
