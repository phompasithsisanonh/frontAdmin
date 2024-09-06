import React, { useState } from "react";
import { Box, Heading, Input, Stack, Button, Select, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import Bar from "../LlistBar/Bar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineProduct } from "react-icons/ai";

function ProductsAdd() {
  const navigate = useNavigate();

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
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddProducts = async () => {
    try {
      if (!productsName || !nameAdmin || !date || !price || !category || !quantity || !size || !codeProducts || !file) {
        setUploadError("Please fill out all required fields and select a file.");
        return;
      }
      setUploading(true);
      setUploadError("");

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
      formData.append("image", file);

      await axios.post(
        "http://localhost:8000/api/v1/products/createProductController",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${decoded}`,
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

  return (
    <Box display={"flex"}>
      <Bar />
      <Box flex="1" p={5}>
        <Heading mb={6}>
          <AiOutlineProduct /> Add Product
        </Heading>

        <Stack spacing={4}>
          <Stack direction={"row"} spacing={4}>
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
          <Stack direction={"row"} spacing={4}>
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
            <FormControl isRequired>
              <FormLabel>Product Image</FormLabel>
              <Input
                type="file"
                onChange={onFileChange}
                accept="image/*"
              />
              {uploadError && <FormErrorMessage>{uploadError}</FormErrorMessage>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Admin Name</FormLabel>
              <Input
                value={nameAdmin}
                onChange={(e) => setNameAdmin(e.target.value)}
                placeholder="Admin name"
              />
            </FormControl>
          </Stack>
          <Stack direction={"row"} spacing={4}>
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
          <Stack direction={"row"} spacing={4} pt={10} justifyContent={"flex-end"}>
            <Button onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddProducts} 
              colorScheme="teal" 
              isLoading={uploading}
            >
              Add Product
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default ProductsAdd;
