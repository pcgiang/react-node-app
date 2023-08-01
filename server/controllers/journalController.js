const Journal = require('../models/journalModels')
const mongoose = require('mongoose')

// GET all journals
const getAllJournals = async (req, res) => {
  const journals = await Journal.find({}).sort({createdAt : -1})
  res.status(200).json(journals)
  // res.json({mssg: 'GET all journals'})
}

// GET a single journal
const getSingleJournal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such journal'})
  }

  const journal = await Journal.findById(id)
  
  if (!journal) {
    return res.status(404).json({error : 'No such journal'})
  }

  res.status(200).json(journal)
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
const deleteJournal = async (req, res) => {
   const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such journal'})
  }
  
  const journal = await Journal.findOneAndDelete({_id: id})
  
  if (!journal) {
    return res.status(400).json({error : 'No such journal'})
  }

  res.status(200).json(journal)
}

// UPDATE a journal
const updateJournal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such journal'})
  }
  
  const journal = await Journal.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  
  if (!journal) {
    return res.status(400).json({error : 'No such journal'})
  }

  res.status(200).json(journal)
}

module.exports = {
    createJournal,
    getAllJournals,
    getSingleJournal,
    deleteJournal,
    updateJournal
}