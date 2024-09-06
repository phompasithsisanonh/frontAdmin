import React, { useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // List of active orders
  const [history, setHistory] = useState([]); // List of completed orders

  // Add a new order
  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      // Separate out the completed orders
      const [completedOrders, activeOrders] = updatedOrders.reduce(
        ([completed, active], order) => {
          if (order.status === "process") {
            completed.push(order);
          } else {
            active.push(order);
          }
          return [completed, active];
        },
        [[], []]
      );

      // Update both lists
      setHistory([...history, ...completedOrders]);
      return activeOrders;
    });
  };

  // Sample order object
  const newOrder = { id: Date.now(), status: "not process" };

  return (
    <div>
      <button onClick={() => addOrder(newOrder)}>Record Order</button>

      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <div>
            <li key={order.id}>{`Order ${order.id}: ${order.status}`}</li>
            <li>
              {" "}
              <button onClick={() => updateOrderStatus(order.id, "process")}>
                Change Status
              </button>
            </li>
          </div>
        ))}
      </ul>

      <h2>Order History</h2>
      <ul>
        {history.map((order) => (
          <div>
            <li key={order.id}>{`Order ${order.id}: ${order.status}`}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Collapse,
//   Divider,
//   Text,
//   VStack,
//   useDisclosure,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
//   useBreakpointValue,
// } from '@chakra-ui/react';

// const menuItems = [
//   { id: 1, label: 'ສັ່ງສິນຄ້າ', path: '/order' },
//   { id: 2, label: 'ຂໍ້ມູນການສັ່ງສິນຄ້າ', path: '' },
//   { id: 3, label: 'ຂໍ້ມູນທາງການເງິນ', path: '' },
//   { id: 4, label: 'ລາຍງານບັນຫາສິນຄ້າ', path: '/income' },
//   { id: 5, label: 'ເພີ່ມແອດມິນ/ລູກຄ້າ', path: '/adminAdd' },
//   { id: 6, label: 'ເພີ່ມສິນຄ້າ', path: '/addProducts' },
//   { id: 7, label: 'ເບີ່ງລາຍການສິນຄ້າ', path: '/listProducts' },
//   { id: 8, label: 'ໂປຣໄຟລ', path: '/profile' },
//   { id: 9, label: 'ລູກຄ້າ', path: '/customer' },
//   { id: 10, label: 'ກວດສອບສິດ', path: '/admin' },
//   { id: 11, label: 'ອອກຈາກລະບົບ', path: '/login', action: () => localStorage.removeItem('token') },
//   { id: 12, label: 'ສະຖານະສິນຄ້າ', path: '/status_Products' },
// ];

// function Bar() {
//   const navigate = useNavigate();
//   const [activeMenuItem, setActiveMenuItem] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   const handleClick = (menuItem) => {
//     if (menuItem.action) menuItem.action();
//     navigate(menuItem.path);
//     setActiveMenuItem(menuItem.id);
//   };

//   const toggleDropdown = (menuNumber) => {
//     setShowDropdown(showDropdown === menuNumber ? null : menuNumber);
//   };

//   const renderMenuItems = (isMobile) => (
//     <>
//       {menuItems.map(item => (
//         <React.Fragment key={item.id}>
//           <Button
//             variant="outline"
//             colorScheme="teal"
//             w="100%"
//             onClick={() => item.path ? handleClick(item) : toggleDropdown(item.id)}
//             isActive={activeMenuItem === item.id}
//           >
//             {item.label}
//           </Button>
//           {item.id === 2 && isMobile && (
//             <Collapse in={showDropdown === item.id}>
//               <VStack align="start" spacing={2} pl={4}>
//                 {menuItems.filter(i => i.id === 12 || i.id === 4).map(subItem => (
//                   <Button key={subItem.id} variant="link" onClick={() => handleClick(subItem)}>
//                     {subItem.label}
//                   </Button>
//                 ))}
//               </VStack>
//             </Collapse>
//           )}
//           {item.id === 3 && isMobile && (
//             <Collapse in={showDropdown === item.id}>
//               <VStack align="start" spacing={2} pl={4}>
//                 {menuItems.filter(i => i.id === 4).map(subItem => (
//                   <Button key={subItem.id} variant="link" onClick={() => handleClick(subItem)}>
//                     {subItem.label}
//                   </Button>
//                 ))}
//               </VStack>
//             </Collapse>
//           )}
//         </React.Fragment>
//       ))}
//     </>
//   );

//   return (
//     <>
//       {isMobile ? (
//         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//           <DrawerOverlay />
//           <DrawerContent>
//             <DrawerCloseButton />
//             <DrawerHeader>Admin</DrawerHeader>
//             <DrawerBody>
//               <VStack align="start" spacing={4}>
//                 {renderMenuItems(true)}
//               </VStack>
//             </DrawerBody>
//           </DrawerContent>
//         </Drawer>
//       ) : (
//         <Box
//           width="250px"
//           height="100vh"
//           bg="gray.800"
//           color="white"
//           p={4}
//           display="flex"
//           flexDirection="column"
//         >
//           <Text fontSize="2xl" mb={4} fontWeight="bold">
//             Admin
//           </Text>
//           <Divider mb={4} />
//           <VStack align="start" spacing={4}>
//             {renderMenuItems(false)}
//           </VStack>
//         </Box>
//       )}
//     </>
//   );
// }

// export default Bar;

