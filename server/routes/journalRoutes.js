const express = require('express')
const {
  createJournal,
} = require('../controllers/journalController')

const router = express.Router()

// GET all journals
router.get('/', async (req, res) => {
  const journals = await Journal.find({}).sort({createdAt : -1})
  res.status(200).json(journals)
  // res.json({mssg: 'GET all journals'})
})

// GET a single journal
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single journal'})
})

// POST a new journal
router.post('/', createJournal)

// DELETE a journal
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a journal'})
})

// UPDATE a journal
router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a journal'})
})

module.exports = router