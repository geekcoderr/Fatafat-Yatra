// index.js

const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser =require('body-parser');
const { getTravellers } = require('./subindex'); // Import getTravellers function

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travellersDB', {
  useNewUrlParser: true, // This option is no longer needed and can be removed
  useUnifiedTopology: true, // This option is no longer needed and can be removed
});

// Define MongoDB schema and model
const profileSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  accountCreationDate: Date,
  accountCreationTime: String,
  balance:Number,
  hash: String,
});
const Profile = mongoose.model('Profile', profileSchema);

const bookedSchema = new mongoose.Schema({
  pickupLocation: String,
  dropLocation: String,
  pickupTime: String,
  dropTime: String,
  discount: Number,
  amountPayed: Number,
  travellerName: String,
  bookingId: String,
  seatsBooked: Number,
  userId: mongoose.Schema.Types.ObjectId,
});
const Booked = mongoose.model('Booked', bookedSchema);


// Hash function using SHA-256
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Handle user registration
app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hash = sha256(username + password); // Generate hash using SHA-256

    // Check if user already exists
    const existingProfile = await Profile.findOne({ username });
    if (existingProfile) {
      return res.status(200).json({ message: 'already-exist' });
    }

    console.log('register triggered');
    // Create new profile
    const now = new Date();
    const profileData = {
      username,
      password,
      email,
      accountCreationDate: now,
      accountCreationTime: now.toTimeString(),
      balance:Math.floor(Math.random() * (69000 - 34000 + 1)) + 34000,
      hash,
    };
    await Profile.create(profileData);
    return res.json({ message: 'registered' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } 
});

// Handle user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = sha256(username + password); // Generate hash using SHA-256

    // Retrieve the profile from the database using the username
    const existingProfile = await Profile.findOne({ username });
    if (!existingProfile) {
      return res.json({ message: 'unauthenticated' });
    }

    // Compare the provided hash with the stored hash
    if (existingProfile.hash === hash) {
      return res.json({ message: 'authenticated' , username:username, id:existingProfile._id});
    } else {
      return res.json({ message: 'unauthenticated' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all profiles
app.get('/profile/:username', async (req, res) => {
  try {
    const username = req.params.username; // Get the username from the request parameters
    const profile = await Profile.findOne({ username }, '-hash'); // Find the profile with the given username, excluding the hash field

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for getting travellers
app.get('/travellers', getTravellers);

app.use(bodyParser.json());

// Route for saving booked data
app.post('/booked', async (req, res) => {
  try {
    const { pickupLocation, dropLocation, pickupTime, dropTime, discount, amountPayed, travellerName, bookingId, seatsBooked } = req.body;

    // Check if bookingId already exists
    const existingBooking = await Booked.findOne({ bookingId });

    // If bookingId doesn't exist, create a new entry
    if (!existingBooking) {
      const bookedData = {
        pickupLocation,
        dropLocation,
        pickupTime,
        dropTime,
        discount,
        amountPayed,
        travellerName,
        bookingId,
        seatsBooked,
      };

      await Booked.create(bookedData);
      console.log(bookedData);
      return res.json({ message: 'Booked data saved' });
    }

    // If bookingId exists, return a message
    console.log(`Booking with ID ${bookingId} already exists.`);
    return res.json({ message: 'Booking already exists' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/booked/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const bookedData = await Booked.findOne({ bookingId }).sort({ _id: -1 });
    if (!bookedData) {
      return res.status(404).json({ message: 'No ticket found' });
    }
    console.log(bookedData);
    return res.json([bookedData]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/booked', async (req, res) => {
  try {
    const bookedData = await Booked.aggregate([
      { $sort: { _id: -1 } },
      { $group: { _id: '$bookingId', doc: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$doc' } }
    ]);
    return res.json(bookedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route for updating user's balance
app.post('/creditupdate', async (req, res) => {
  // console.log('called');
  try {
    const { username, deductionAmount } = req.body;

    // Find the user's profile
    const existingProfile = await Profile.findOne({ username });

    // If the profile doesn't exist, return an error message
    if (!existingProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Deduct the provided amount from the existing balance
    existingProfile.balance -= deductionAmount;

    // console.log(deductionAmount);
    // Save the updated profile with the new balance
    await existingProfile.save();

    return res.json({ message: 'Balance updated successfully', newBalance: existingProfile.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


const supportSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Support = mongoose.model('Support', supportSchema);

app.post('/support', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new entry in the "support" collection
    await Support.create({ name, email, message });

    return res.json({ message: 'Support data saved' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
