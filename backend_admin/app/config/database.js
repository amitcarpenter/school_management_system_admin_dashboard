const mongoose = require("mongoose")
const connectionString = 'mongodb+srv://amit:amit93023@cluster0.ba5ekm2.mongodb.net/AdminDashboard';
// const connectionString = 'mongodb://127.0.0.1/adminDashboard';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
