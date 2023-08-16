import { useState } from 'react';
import journalStyle from '../styles/journalStyle.css';
import JournalPopup from './JournalPopup';
import { useJournalContext } from '../hooks/useJournalsContext';
import MyAlert from './Alert';

// date fns
import { formatDistanceToNow, format } from 'date-fns'

const JournalDetails = ({ journal }) => {
  const { dispatch } = useJournalContext()
  const [ isEditPopup, setIsEditPopup ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ isSubmit, setIsSubmit ] = useState(false)
  const [ isAlert, setIsAlert ] = useState(false)

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
      dispatch({ type: 'EDIT_JOURNAL', payload: json})
    }
  }

  const handleDelete = async () => {
    const response = await fetch('/api/journals/' + journal._id , {
      method: 'DELETE'
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      dispatch({ type : 'DELETE_JOURNAL', payload : json })
    }
  }

  const handleAlert = () => {
    setIsAlert(true)
    setTimeout(() => setIsAlert(false), 2000)
  }


  return (
    <div className='journals'>
      <div onClick={() => setIsEditPopup(true)}  className="journal-details">
        <b> { format( new Date(journal.createdAt), 'dd MMM yyyy')} </b>

        <p className='journal-content' onClick={() => setIsEditPopup(true)}> { journal.content } </p>
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
      </div>


      {
        isEditPopup && (
          <JournalPopup
            content={journal.content} happiness={journal.happiness}
            isSubmit={isSubmit} error={error} isEdit={true}
            setIsPopup={setIsEditPopup} handleSubmit={handleEditSubmit}
            handleAlert={handleAlert}
          />
        )
      }

      {
        isAlert && (
          <MyAlert serverity={0} message='Journal edited sucessfully!'/>
        )
      }
    </div>
  )
}

export default JournalDetails