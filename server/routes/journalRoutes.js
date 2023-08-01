const express = require('express')
const {
  createJournal,
  getAllJournals,
  getSingleJournal,
  deleteJournal,
  updateJournal
} = require('../controllers/journalController')

const router = express.Router()

// GET all journals
router.get('/', getAllJournals)

// GET a single journal
router.get('/:id', getSingleJournal)

// POST a new journal
router.post('/', createJournal)

// DELETE a journal
router.delete('/:id', deleteJournal)

// UPDATE a journal
router.patch('/:id', updateJournal)

module.exports = router