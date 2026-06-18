const db = require('../config/db');
// CREATE order
exports.createOrder = (req, res) => {
  const {
  user_id,
  customer_name,
  phone,
  delivery_required,
  address,
  delivery_date,
  product_type,
  is_custom,
  custom_details,
  total_price
} = req.body;

//console.log("REQUEST BODY:", req.body);
//console.log("is_custom =", is_custom);

const isCustom = is_custom ?? false;

// ✅ basic validation
if (!customer_name || !phone || !product_type) {
  return res.status(400).json({
    message: 'Required fields are missing'
  });
}

// ✅ only for ready orders
if (!isCustom && (!total_price || total_price <= 0)) {
  return res.status(400).json({
    message: 'Price is required for ready-made orders'
  });
}

 

  const allowedStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  const deliveryRequired = delivery_required ?? false;
  //const isCustom = is_custom ?? false;
  //const orderStatus = isCustom ? "pending" : "price_confirmed";
  const sql = `
    INSERT INTO orders
    (user_id,customer_name, phone, delivery_required, address, delivery_date,
     product_type, is_custom, custom_details, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const finalPrice = isCustom ? 0 : total_price;
  


  db.query(
    sql,
    [
      user_id,
      customer_name,
      phone,
      deliveryRequired,
      address,
      delivery_date,
      product_type,
      isCustom,
      custom_details,
      finalPrice
      //orderStatus
    ],
    (err, result) => {
      //console.log("MYSQL RESULT:", result);
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to place order' });
      }

      res.status(201).json({
        message: 'Order placed successfully',
    
         order_id: result.insertId
      });
    }
  );
};

// GET all orders
exports.getAllOrders = (req, res) => {
  const sql = 'SELECT * FROM orders ORDER BY created_at DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch orders' });
    }

    res.json(results);
  });
};

// GET order by ID
exports.getOrderById = (req, res) => {
  const orderId = req.params.id;

  const sql = 'SELECT * FROM orders WHERE order_id = ?';

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(results[0]);
  });
};

// UPDATE order status
exports.updateOrderStatus = (req, res) => {
  const orderId = req.params.id;
  const { order_status } = req.body;

  const allowedStatuses = [
  'pending',
  'price_confirmed',
  'advance_paid',
  'paid',
  'total_paid',
  'delivered'
];

  if (!order_status) {
    return res.status(400).json({ message: 'order_status is required' });
  }
  if (!allowedStatuses.includes(order_status)) {
    return res.status(400).json({
      message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}`
    });
  }
  const sql = `
    UPDATE orders
    SET order_status = ?
    WHERE order_id = ?
  `;

  db.query(sql, [order_status, orderId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update order status' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully' });
  });
};


exports.updatePayment = (req, res) => {
  const orderId = req.params.id;
  const { payment_step, advance_amount } = req.body;

  if (!['advance', 'final'].includes(payment_step)) {
    return res.status(400).json({ message: 'Invalid payment_step' });
  }

  // 1️⃣ Get order details
  const getOrderSql = `
    SELECT total_price, advance_amount
    FROM orders
    WHERE order_id = ?
  `;

  db.query(getOrderSql, [orderId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0)
      return res.status(404).json({ message: 'Order not found' });

    const totalPrice = Number(results[0].total_price);
    const currentAdvance = Number(results[0].advance_amount || 0);

    let newAdvance = currentAdvance;
    let paymentStatus = 'unpaid';

    // 2️⃣ Calculate advance / final
    if (payment_step === 'advance') {
      if (!advance_amount || advance_amount <= 0) {
        return res.status(400).json({ message: 'Advance amount required' });
      }

      newAdvance = Number(advance_amount);
      paymentStatus = newAdvance >= totalPrice ? 'paid' : 'partial';
    }

    if (payment_step === 'final') {
      newAdvance = totalPrice;
      paymentStatus = 'paid';
    }

    const remainingAmount = totalPrice - newAdvance;

    // 3️⃣ Update orders table
    const updateOrderSql = `
      UPDATE orders
      SET
        payment_step = ?,
        advance_amount = ?,
        remaining_amount = ?,
        payment_status = ?
      WHERE order_id = ?
    `;

    db.query(
      updateOrderSql,
      [payment_step, newAdvance, remainingAmount, paymentStatus, orderId],
      (err) => {
        if (err)
          return res.status(500).json({ message: 'Payment update failed' });

        // 4️⃣ VERY IMPORTANT: payment history amount
        let paymentAmount = 0;

        if (payment_step === 'advance') {
          paymentAmount = newAdvance; // e.g. 100
        }

        if (payment_step === 'final') {
          paymentAmount = totalPrice - currentAdvance; // e.g. 299 ✅
        }

        // 5️⃣ Insert into payments table
        const insertPaymentSql = `
          INSERT INTO payments (order_id, payment_step, amount, payment_status)
          VALUES (?, ?, ?, ?)
        `;

        db.query(
          insertPaymentSql,
          [orderId, payment_step, paymentAmount, paymentStatus],
          (err) => {
            if (err) {
              console.error('Payment history insert failed:', err);
            }

            return res.json({
              message: 'Payment updated successfully',
              advance_amount: newAdvance,
              remaining_amount: remainingAmount,
              payment_status: paymentStatus,
            });
          }
        );
      }
    );
  });
};


// GET payment details of an order
exports.getPaymentDetails = (req, res) => {
  const orderId = req.params.id;

  const sql = `
    SELECT 
      order_id,
      total_price,
      advance_amount,
      remaining_amount,
      payment_step,
      payment_status
    FROM orders
    WHERE order_id = ?
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch payment details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(results[0]);
  });
};
exports.getPaymentHistory = (req, res) => {
  const orderId = req.params.id;

  const sql = `
    SELECT payment_step, amount, payment_status, payment_date
    FROM payments
    WHERE order_id = ?
    ORDER BY payment_date ASC
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json(results);
  });
};

// DELETE order
exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;

  const sql = 'DELETE FROM orders WHERE order_id = ?';

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete order' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  });
};

exports.confirmOrderPrice = (req, res) => {

  const orderId = req.params.id;
  const { total_price, advance_amount } = req.body;

  const remaining_amount =
    total_price - advance_amount;

  const sql = `
    UPDATE orders
    SET total_price = ?,
        advance_amount = ?,
        remaining_amount = ?,
        order_status = 'price_confirmed'
    WHERE order_id = ?
  `;

  db.query(
    sql,
    [
      total_price,
      advance_amount,
      remaining_amount,
      orderId
    ],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to confirm price"
        });
      }

      res.json({
        message: "Price confirmed successfully"
      });
    }
  );
};
// GET order status + price info (for order-status.html)
exports.getOrderPaymentStatus = (req, res) => {
  const orderId = req.params.orderId;

  const sql = `
    SELECT 
      order_status,
      total_price,
      advance_amount
    FROM orders
    WHERE order_id = ?
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(results[0]);
  });
};
exports.getOrdersByUser = (req, res) => {

    const userId = req.params.userId;

    const sql =
        "SELECT * FROM orders WHERE user_id = ? ORDER BY order_id DESC";

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch orders"
            });
        }

        res.json(results);
    });
};


