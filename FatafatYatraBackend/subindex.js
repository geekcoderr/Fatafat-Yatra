const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travellersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Traveller schema
const travellerSchema = new Schema({
  pickuptime: Date,
  droptime: Date,
  price: Number,
  travels: String,
  availableSeats: Number, // Add the availableSeats field
});

// Function to handle GET /travellers request
async function getTravellers(req, res) {
  const { from, to, date } = req.query;

  // Generate collection name
  const collectionName = `${from.toLowerCase()}_to_${to.toLowerCase()}`;

  // Check if collection exists
  let collection;
  try {
    collection = mongoose.model(collectionName);
  } catch (error) {
    // Collection does not exist, create it
    collection = mongoose.model(collectionName, travellerSchema);
    const randomData = generateRandomData();
    await collection.insertMany(randomData);
    console.log('Collection created and data generated.');
    // Retrieve data from the newly created collection
    const data = await collection.find();
    // console.log(data);
    res.json(data);
    return;
  }

  // Collection already exists, retrieve data
  const data = await collection.find();
  // console.log(data);
  res.json(data);
}

// Function to generate random data
function generateRandomData() {
  const data = [];
  const travels = [
    'Vijay Tour & Travels',
    'Shakti Travels',
    'Ganesh Yatra Company',
    'Balaji Travels',
    'Vikas Travels',
    'Chotiwala Travels',
  ];

  for (let i = 0; i < Math.floor(Math.random() * 27) + 4; i++) {
    const pickuptime = new Date(Date.now() + Math.floor(Math.random() * 86400000)); // Random time within next 24 hours
    const droptime = new Date(
      pickuptime.getTime() + Math.floor(Math.random() * 25200000) + 18000000
    ); // Random time between 5 to 12 hours after pickuptime
    const price = Math.floor(Math.random() * 9001) + 1000; // Random price between 1000 to 10000
    const travelIndex = Math.floor(Math.random() * travels.length);
    const travelsName = travels[travelIndex];
    const availableSeats = Math.floor(Math.random() * (40 - 2 + 1)) + 2; // Random number between 2 and 6

    data.push({
      pickuptime,
      droptime,
      price,
      travels: travelsName,
      availableSeats, // Add the availableSeats field
    });
  }

  return data;
}

module.exports = { getTravellers };