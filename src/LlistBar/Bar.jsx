import React, { useState, useCallback } from 'react';
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
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import "../index.css";

const Bar = React.memo(() => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleClick = useCallback((menuNumber) => {
    setActiveMenuItem((prev) => (menuNumber === prev ? null : menuNumber));
    switch (menuNumber) {
      case 1: navigate('/order'); break;
      case 2: navigate('/'); break;
      case 3: navigate('/'); break;
      case 4: navigate('/income'); break;
      case 5: navigate('/adminAdd'); break;
      case 6: navigate('/addProducts'); break;
      case 7: navigate('/listProducts'); break;
      case 8: navigate('/profile'); break;
      case 9: navigate('/customer'); break;
      case 10: navigate('/admin'); break;
      case 11: localStorage.removeItem('token'); navigate('/login'); break;
      case 12: navigate('/status_Products'); break;
      default: break;
    }
  }, [navigate]);

  const toggleDropdown = useCallback((menuNumber) => {
    setShowDropdown((prev) => (prev === menuNumber ? null : menuNumber));
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <HStack p={4} justifyContent="space-between">
            <Text fontSize="2xl" fontWeight="bold">Admin</Text>
            <IconButton
              aria-label="Open Menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          </HStack>
          <Drawer fontFamily={'Noto Sans Lao, sans-serif'} isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Admin</DrawerHeader>
              <DrawerBody>
                <VStack align="start" spacing={4}>
                  {menuItems.map(item => (
                    <Button
                      key={item.id}
                      variant="outline"
                      colorScheme="teal"
                      w="100%"
                      onClick={() => handleClick(item.id)}
                      isActive={activeMenuItem === item.id}
                    >
                      {item.label}
                    </Button>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
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
            {menuItems.map(item => (
              <React.Fragment key={item.id}>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="100%"
                  onClick={() => handleClick(item.id)}
                  isActive={activeMenuItem === item.id}
                >
                  {item.label}
                </Button>
                {item.subItems && (
                  <Collapse in={showDropdown === item.id}>
                    <VStack align="start" spacing={2} pl={4}>
                      {item.subItems.map(subItem => (
                        <Button key={subItem.id} variant="link" onClick={() => handleClick(subItem.id)}>
                          {subItem.label}
                        </Button>
                      ))}
                    </VStack>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
});

const menuItems = [
  { id: 1, label: 'ສັ່ງສິນຄ້າ' },
  {
    id: 2, label: 'ຂໍ້ມູນການສັ່ງສິນຄ້າ', subItems: [
      { id: 12, label: 'ສະຖານະສິນຄ້າ' },
      { id: 4, label: 'ລາຍງານບັນຫາສິນຄ້າ' },
      { id: 4, label: 'ປະຫວັດການສັ່ງສິນຄ້າ' }
    ]
  },
  { id: 2, label: 'ໜ້າຫຼັກ' },
  {
    id: 3, label: 'ຂໍ້ມູນທາງການເງິນ', subItems: [
      { id: 4, label: 'ລາຍຮັບ-ລາຍຈ່າຍ' },
      { id: 4, label: 'ລາຍງານບັນຫາສິນຄ້າ' },
      { id: 4, label: 'ປະຫວັດການສັ່ງສິນຄ້າ' }
    ]
  },
  { id: 5, label: 'ເພີ່ມແອດມິນ/ລູກຄ້າ' },
  { id: 6, label: 'ເພີ່ມສິນຄ້າ' },
  { id: 7, label: 'ເບີ່ງລາຍການສິນຄ້າ' },
  { id: 8, label: 'ໂປຣໄຟລ' },
  { id: 9, label: 'ລູກຄ້າ' },
  { id: 10, label: 'ກວດສອບສິດ' },
  { id: 11, label: 'ອອກຈາກລະບົບ' }
];

export default Bar;
