import { useState } from 'react';
import journalStyle from '../styles/journalStyle.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import JournalPopup from './JournalPopup';
import { set } from 'mongoose';

const JournalDetails = ({ journal }) => {
  const [ isEditPopup, setIsEditPopup ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ isSubmit, setIsSubmit ] = useState(false)
  const [ content, setContent ] = useState(journal.content)
  const [ happiness, setHappiness ] = useState(journal.happiness)

  const handleSubmit = async (event, _content, _happiness) => {
    event.preventDefault();
    const journal = { _content, _happiness }

    // backend not done yet
    const response = await fetch('/api/journals', {
      method: 'PATCH',
      body: JSON.stringify(journal),
      headers: {
        'Content-Type' : 'application/json'
      }
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      console.log(error)
    }
    if (response.ok) {
      setError(null)
      setIsSubmit(true)
      setContent(_content)
      setHappiness(_happiness)
      console.log(' journal is edited ')
      console.log(journal)
    }

  }


  return (
    <div className="journal-details">
      <b> { journal.createdAt } </b>
      <p className='journal-content'> { journal.content } </p>
      <div className='bottom-row'>
        <p> <strong> Mood: </strong> { journal.happiness }/5 </p>
        <div>
          <span onClick={() => setIsEditPopup(true)}>
            <EditNoteIcon className='icon'/>
          </span>
          <span>
            <DeleteIcon className='icon'/>
          </span>
        </div>
      </div>

      {
        isEditPopup && (
          <JournalPopup
            content={journal.content} happiness={journal.happiness}
            isSubmit={isSubmit} error={error}
            setIsPopup={setIsEditPopup} handleSubmit={handleSubmit}
          />
        )
      }
    </div>
  )
}

export default JournalDetails