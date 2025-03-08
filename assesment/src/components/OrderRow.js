// import { Td, Tr} from "@chakra-ui/react";
// import { motion } from "framer-motion";

// const MotionTr = motion(Tr);

// function OrderRow({ order }) {
//   return (
//     <MotionTr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <Td>{order.id}</Td>
//       <Td>{order.customer}</Td>
//       <Td>{order.items.join(", ")}</Td>
//       <Td>${order.totalPrice.toFixed(2)}</Td>
//       <Td>{order.status}</Td>
//       <Td>{new Date(order.timestamp).toLocaleString()}</Td>
//       <Td>
//         {/* ORDER ID PASSED AS PROPS TO COMPLETE ORDER BUTTON  */}
//         {order.status === "Pending" && <CompleteOrderButton orderId={order.id} />}
//       </Td>
//     </MotionTr>
//   );
// }

// export default OrderRow;
