const Journal = require('../models/journalModels')

// GET all journals
const getAllJournals = async (req, res) => {
  const journals = await Journal.find({}).sort({createdAt : -1})
  res.status(200).json(journals)
  // res.json({mssg: 'GET all journals'})
}

// GET a single journal
const getSingleJournal = (req, res) => {
  res.json({mssg: 'GET a single journal'})
}

// POST a new journal
const createJournal = async (req, res) => {
  const {happiness, content} = req.body

  try {
    const journal = await Journal.create({happiness, content})
    res.status(200).json(journal)
  } catch (error) { 
    res.status(400).json({error: error.message})
  }
}

// DELETE a journal
const deleteJournal = (req, res) => {
  res.json({mssg: 'DELETE a journal'})
}

// UPDATE a journal
const updateJournal = (req, res) => {
  res.json({mssg: 'UPDATE a journal'})
}

module.exports = {
    createJournal
}