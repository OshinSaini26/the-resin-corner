const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePayment,
  getPaymentDetails,
  getPaymentHistory,
  deleteOrder,
  confirmOrderPrice,
  getOrdersByUser,
  getOrderPaymentStatus
  
} = require('../controllers/orders.controller');

// routes
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/payment', updatePayment);
router.get('/:id/payment',getPaymentDetails);
router.get('/:id/payments', getPaymentHistory);
router.delete('/:id', deleteOrder);
router.put("/:id/confirm-price",confirmOrderPrice);
router.get("/orders/:orderId/payment",getOrderPaymentStatus);
router.get('/user/:userId', getOrdersByUser);


module.exports = router;
