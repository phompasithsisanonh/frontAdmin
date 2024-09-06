import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Bar1 from "../LlistBar/Bar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
function Income() {
  const data = [
    { quarter: "Q1", series1: 35, series2: 51, series3: 15, series4: 60 },
    { quarter: "Q2", series1: 44, series2: 6, series3: 25, series4: 50 },
    { quarter: "Q3", series1: 24, series2: 49, series3: 30, series4: 15 },
    { quarter: "Q4", series1: 34, series2: 30, series3: 50, series4: 25 },
  ];
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Box display={"flex"}>
      <Bar1 />
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
          display={"flex"}
          paddingTop={"120px"}
          paddingLeft={"150px"}
          spacing={120}
        >
          <Box background={"#61dafb"} className="dashbord_Stock">
            <Box>
              <Heading>1.500.000 ກີບ</Heading>
              <Text>ລາຍຮັບ</Text>
            </Box>
            <Box fontSize={"40px"}>
              <Link>
                <FaEye />
              </Link>
            </Box>
          </Box>

          <Box background={"#ff0000"} className="dashbord_Stock">
            <Box>
              <Heading>1.500.000 ກີບ</Heading>
              <Text>ລາຍຈ່າຍ</Text>
            </Box>
            <Box fontSize={"40px"}>
              <Link>
                <FaEye />
              </Link>
            </Box>
          </Box>
        </Stack>
        <Box paddingTop="100px" paddingLeft="150px" display="flex" justifyContent="space-between" alignItems="center">
          <Box width="100%" display="flex" flexDirection="column" alignItems="center">
            <Heading textAlign="center" marginBottom="20px">ສະຖິຕິລາຍຮັບ</Heading>
            <ResponsiveContainer width="100%" height={290}>
              <BarChart
                data={data}
                margin={{ top: 20, bottom: 20, left: 0, right: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="series1" fill="#8884d8" />
                <Bar dataKey="series2" fill="#82ca9d" />
                <Bar dataKey="series3" fill="#ffc658" />
                <Bar dataKey="series4" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box width="50%">
            <Heading textAlign="center" marginBottom="20px">ລາຍການຂາຍດີທີ່ສຸດ</Heading>
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ຊື່ລູກຄ້າ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name} sx={{ border: 0 }}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          

          <Box width="20%">
            <Heading textAlign="center" marginBottom="20px">ລາຍການລາຍຮັບ</Heading>
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ຊື່ລູກຄ້າ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name} sx={{ border: 0 }}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

        </Box>
      
      </Stack>
    </Box>
  );
}

export default Income;
