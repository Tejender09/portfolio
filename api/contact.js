const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  const uri = process.env.MONGODB_URI || "mongodb+srv://Tejender:Tejender2006@cluster0.ig0roab.mongodb.net/portfolio?retryWrites=true&w=majority";
  if (!uri) throw new Error('MONGODB_URI is required');
  const db = await mongoose.connect(uri);
  cachedDb = db;
  return db;
}

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  }
}, {
  timestamps: true
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body || {};

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
      }

      await connectToDatabase();
      const newContact = new Contact({ name, email, message });
      await newContact.save();

      return res.status(201).json({
        message: 'Message sent and stored in MongoDB successfully!'
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ count: messages.length, messages });
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
