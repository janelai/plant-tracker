// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const path = require('path');
// const { connectDB } = require('./config/db');
// const errorHandler = require('./middleware/errorHandler');

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const plantRoutes = require('./routes/plantRoutes');
// const careLogRoutes = require('./routes/careLogRoutes');
// const uploadRoutes = require('./routes/uploadRoutes');

// // Initialize app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to database
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/plants', plantRoutes);
// app.use('/api/care-logs', careLogRoutes);
// app.use('/api/uploads', uploadRoutes);

// // Error handler
// app.use(errorHandler);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Initialize express
const app = express();

// Connect to database
console.log('Connecting to MongoDB...');
connectDB()
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const plantRoutes = require('./routes/plantRoutes');
app.use('/api/plants', plantRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});