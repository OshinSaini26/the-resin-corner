const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 

const app = express();
const PORT = 3000;


app.use(cors());


app.use(express.json());


const orderRoutes = require('./routes/orders.routes');
const userRoutes = require('./routes/users.routes');
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);



app.get('/', (req, res) => {
  res.send('Resin Order Platform API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


