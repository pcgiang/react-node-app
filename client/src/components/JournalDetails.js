import { useState } from 'react';
import journalStyle from '../styles/journalStyle.css';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';
import JournalPopup from './JournalPopup';

const JournalDetails = ({ journal }) => {
  const [ isEditPopup, setIsEditPopup ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ isSubmit, setIsSubmit ] = useState(false)

  const handleEditSubmit = async (event, content, happiness) => {
    event.preventDefault();

    const response = await fetch('/api/journals/' + journal._id, {
      method: 'PATCH',
      body: JSON.stringify({ content, happiness }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })

    const json = await response.json()
    console.log(json)
    if (!response.ok) {
      setError(json.error)
      console.log(error)
    }
    if (response.ok) {
      setError(null)
      setIsSubmit(true)
      console.log(' journal is edited ')
      console.log(json)
    }
  }

  const handleDelete = async () => {
    const response = await fetch('/api/journals/' + journal._id , {
      method: 'DELETE'
    })
  }


  return (
    <div className="journal-details">
      <b> { journal.createdAt } </b>
      <p className='journal-content'> { journal.content } </p>
      <div className='bottom-row'>
        <p> <strong> Mood: </strong> { journal.happiness }/5 </p>
        <div>
          <span onClick={() => setIsEditPopup(true)} className='material-icons icon'>
            edit_note
          </span>
          <span onClick={() => handleDelete()} className='material-icons icon'>
            delete
          </span>
        </div>
      </div>

      {
        isEditPopup && (
          <JournalPopup
            content={journal.content} happiness={journal.happiness}
            isSubmit={isSubmit} error={error} isEdit={true}
            setIsPopup={setIsEditPopup} handleSubmit={handleEditSubmit}
          />
        )
      }

    </div>
  )
}

export default JournalDetails