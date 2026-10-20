const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

// In-memory fallback storage if MongoDB is not currently running locally
const inMemoryContacts = [];

router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const newContact = new Contact({ name, email, message });
      await newContact.save();
      return res.status(201).json({ 
        message: 'Message sent and stored in MongoDB successfully!' 
      });
    } else {
      // Offline fallback: save to memory so the contact form works reliably
      const record = { id: Date.now(), name, email, message, createdAt: new Date() };
      inMemoryContacts.push(record);
      console.log('MongoDB is not connected. Saved submission to fallback storage:', record);
      return res.status(201).json({ 
        message: 'Message received successfully!' 
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'This email has already submitted a message.' });
    }
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json({ count: messages.length, messages });
    }
    // Fallback if running offline
    res.json({ count: inMemoryContacts.length, messages: inMemoryContacts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
