const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const debtRoutes = require('./routes/debts');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/debtmanagement';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// API routes
app.use('/api/debts', debtRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
