import React from 'react'
import { useState } from 'react'
import journalStyle from '../styles/journalStyle.css'
import JournalPopup from './JournalPopup'
import { useJournalContext } from '../hooks/useJournalsContext'
import MyAlert from './Alert'

const AddJournal = () => {
  const { dispatch } = useJournalContext()
  const [ content, setContent ] = useState("")
  const [ error, setError ] = useState(null)
  const [ isPopup, setIsPopup ] = useState(false)
  const [ isSubmit, setIsSubmit ] = useState(false)
  const [ isAlert, setIsAlert ] = useState(true)

  const handleSubmit = async (e, content, happiness) => {
    e.preventDefault(); // prevent page reload when form is submited
    const journal = { content, happiness } 

    const response = await fetch('/api/journals', {
      method: 'POST',
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
      setContent('')
      setHappiness(null)
      setError(null)
      setIsSubmit(true)
      setIsAlert(true)
      console.log(' new journal added ')
      console.log(journal)
      dispatch({ type : 'CREATE_JOURNAL', payload : json})
    }
  }

  const [ happiness, setHappiness ] = useState(null)

  return (
    <div  className="add-journal">
    {
      !isPopup && (
        <div className='journal-input-container'>
          <input
            type="text" className='journal-input'
            placeholder='How was your day today'
            onClick={() => setIsPopup(true)}
          />
        </div>

      )
    }

    { isPopup && (
      <JournalPopup
        content={content} happiness={happiness} 
        error={error} isSubmit={isSubmit}
        setIsPopup={setIsPopup} handleSubmit={handleSubmit}
      />
    )}

    { isAlert && (
      <MyAlert serverity={0} message={'Journal added successfully!'}/>
    )}

    </div>

  )
}

export default AddJournal