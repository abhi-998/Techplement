const express = require('express');
const axios = require('axios');
const router = express.Router();
const Quote = require('../models/Quote');

// Render homepage
router.get('/', async (req, res) => {
  res.render('index');
});


// Fetch and return random quote via ZenQuotes API
router.get('/random-quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = response.data[0];
    res.json({
      content: quote.q,
      author: quote.a
    });
  } catch (err) {
    console.error('Error fetching quote:', err.message);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});


// Save quote to DB
router.post('/save-quote', async (req, res) => {
  const { content, author } = req.body;
  const saved = new Quote({ content, author });
  await saved.save();
  res.redirect('/');
});

// View saved quotes
router.get('/saved', async (req, res) => {
  const quotes = await Quote.find({});
  res.render('saved', { quotes });
});

// Search quotes by author
router.get('/search', async (req, res) => {
  const { author } = req.query;
  try {
    const quotes = await Quote.find({ author: new RegExp(author, 'i') }); // case-insensitive
    res.json(quotes);
  } catch (err) {
    console.error('Error searching DB:', err.message);
    res.status(500).json({ error: 'Failed to search quotes' });
  }
});


module.exports = router;
