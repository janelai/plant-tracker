const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB...');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('MongoDB Connected Successfully!');
  
  // Create a simple model and document to test full functionality
  const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
  
  return TestModel.create({ name: 'test document' })
    .then(doc => {
      console.log('Successfully created document:', doc);
      return mongoose.connection.close();
    });
})
.catch(err => {
  console.error('MongoDB connection failed:', err.message);
  console.error('Error details:', err);
});