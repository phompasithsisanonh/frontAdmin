import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Text,
  VStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import "../index.css"
function Bar() {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleClick = (menuNumber) => {
    setActiveMenuItem(menuNumber === activeMenuItem ? null : menuNumber);
    switch (menuNumber) {
      case 1:
        navigate('/order');
        break;
      case 2:
        navigate('/');
        break;
      case 3:
        navigate('/');
        break;
      case 4:
        navigate('/income');
        break;
      case 5:
        navigate('/adminAdd');
        break;
      case 6:
        navigate('/addProducts');
        break;
      case 7:
        navigate('/listProducts');
        break;
      case 8:
        navigate('/profile');
        break;
      case 9:
        navigate('/customer');
        break;
      case 10:
        navigate('/admin');
        break;
      case 11:
        localStorage.removeItem('token');
        navigate('/login');
        break;
      case 12:
        navigate('/status_Products');
        break;
      default:
        break;
    }
  };

  const toggleDropdown = (menuNumber) => {
    setShowDropdown(showDropdown === menuNumber ? null : menuNumber);
  };

  return (
    <>
      {isMobile ? (
        <Drawer     fontFamily={'Noto Sans Lao, sans-serif'} isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Admin</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(1)}
                  isActive={activeMenuItem === 1}
                >
                  ສັ່ງສິນຄ້າ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => toggleDropdown(2)}
                  isActive={activeMenuItem === 2}
                >
                  ຂໍ້ມູນການສັ່ງສິນຄ້າ
                </Button>
                <Collapse in={showDropdown === 2}>
                  <VStack align="start" spacing={2} pl={4}>
                    <Button variant="link" onClick={() => handleClick(12)}>
                      ສະຖານະສິນຄ້າ
                    </Button>
                    <Button variant="link" onClick={() => handleClick(4)}>
                      ລາຍງານບັນຫາສິນຄ້າ
                    </Button>
                    <Button variant="link" onClick={() => handleClick(4)}>
                      ປະຫວັດການສັ່ງສິນຄ້າ
                    </Button>
                  </VStack>
                </Collapse>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(2)}
                  isActive={activeMenuItem === 2}
                >
                  ໜ້າຫຼັກ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => toggleDropdown(3)}
                  isActive={activeMenuItem === 3}
                >
                  ຂໍ້ມູນທາງການເງິນ
                </Button>
                <Collapse in={showDropdown === 3}>
                  <VStack align="start" spacing={2} pl={4}>
                    <Button variant="link" onClick={() => handleClick(4)}>
                      ລາຍຮັບ-ລາຍຈ່າຍ
                    </Button>
                    <Button variant="link" onClick={() => handleClick(4)}>
                      ລາຍງານບັນຫາສິນຄ້າ
                    </Button>
                    <Button variant="link" onClick={() => handleClick(4)}>
                      ປະຫວັດການສັ່ງສິນຄ້າ
                    </Button>
                  </VStack>
                </Collapse>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(5)}
                  isActive={activeMenuItem === 5}
                >
                  ເພີ່ມແອດມິນ/ລູກຄ້າ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(6)}
                  isActive={activeMenuItem === 6}
                >
                  ເພີ່ມສິນຄ້າ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(7)}
                  isActive={activeMenuItem === 7}
                >
                  ເບີ່ງລາຍການສິນຄ້າ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(8)}
                  isActive={activeMenuItem === 8}
                >
                  ໂປຣໄຟລ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(9)}
                  isActive={activeMenuItem === 9}
                >
                  ລູກຄ້າ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(10)}
                  isActive={activeMenuItem === 10}
                >
                  ກວດສອບສິດ
                </Button>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(11)}
                  isActive={activeMenuItem === 11}
                >
                  ອອກຈາກລະບົບ
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Box
          width="250px"
          height="100vh"
          bg="gray.800"
          color="white"
          p={4}
          display="flex"
          flexDirection="column"
        >
          <Text fontSize="2xl" mb={4} fontWeight="bold">
            Admin
          </Text>
          <Divider mb={4} />
          <VStack align="start" spacing={4}>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(1)}
              isActive={activeMenuItem === 1}
            >
              ສັ່ງສິນຄ້າ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => toggleDropdown(2)}
              isActive={activeMenuItem === 2}
            >
              ຂໍ້ມູນການສັ່ງສິນຄ້າ
            </Button>
            <Collapse in={showDropdown === 2}>
              <VStack align="start" spacing={2} pl={4}>
                <Button variant="link" onClick={() => handleClick(12)}>
                  ສະຖານະສິນຄ້າ
                </Button>
                <Button variant="link" onClick={() => handleClick(4)}>
                  ລາຍງານບັນຫາສິນຄ້າ
                </Button>
                <Button variant="link" onClick={() => handleClick(4)}>
                  ປະຫວັດການສັ່ງສິນຄ້າ
                </Button>
              </VStack>
            </Collapse>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(2)}
              isActive={activeMenuItem === 2}
            >
              ໜ້າຫຼັກ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => toggleDropdown(3)}
              isActive={activeMenuItem === 3}
            >
              ຂໍ້ມູນທາງການເງິນ
            </Button>
            <Collapse in={showDropdown === 3}>
              <VStack align="start" spacing={2} pl={4}>
                <Button variant="link" onClick={() => handleClick(4)}>
                  ລາຍຮັບ-ລາຍຈ່າຍ
                </Button>
                <Button variant="link" onClick={() => handleClick(4)}>
                  ລາຍງານບັນຫາສິນຄ້າ
                </Button>
                <Button variant="link" onClick={() => handleClick(4)}>
                  ປະຫວັດການສັ່ງສິນຄ້າ
                </Button>
              </VStack>
            </Collapse>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(5)}
              isActive={activeMenuItem === 5}
            >
              ເພີ່ມແອດມິນ/ລູກຄ້າ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(6)}
              isActive={activeMenuItem === 6}
            >
              ເພີ່ມສິນຄ້າ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(7)}
              isActive={activeMenuItem === 7}
            >
              ເບີ່ງລາຍການສິນຄ້າ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(8)}
              isActive={activeMenuItem === 8}
            >
              ໂປຣໄຟລ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(9)}
              isActive={activeMenuItem === 9}
            >
              ລູກຄ້າ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(10)}
              isActive={activeMenuItem === 10}
            >
              ກວດສອບສິດ
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              w="100%"
              onClick={() => handleClick(11)}
              isActive={activeMenuItem === 11}
            >
              ອອກຈາກລະບົບ
            </Button>
          </VStack>
        </Box>
      )}
    </>
  );
}

export default Bar;