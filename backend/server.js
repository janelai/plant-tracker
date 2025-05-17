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
const app = express();
const cors = require('cors');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Import routes
const plantRoutes = require('./routes/plantRoutes');

// Use routes - make sure plantRoutes is a router, not an object
app.use('/api/plants', plantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});