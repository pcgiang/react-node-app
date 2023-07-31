import React from 'react'
import { useState } from 'react'
import journalStyle from '../styles/journalStyle.css'
import MoodSelecter from './MoodSelecter'

const AddJournal = ({ addJournal }) => {
  const [ content, setContent ] = useState("")
  const [ error, setError ] = useState(null)
  const [ isPopup, setIsPopup ] = useState(false)
  const [ isSubmit, setIsSubmit ] = useState(false)

  const handleSubmit = async (e) => {
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
      console.log(' new journal added ')
      console.log(journal)
    }
  }

  const [ happiness, setHappiness ] = useState(null)
  const handleHappinessSelect = (e) => {
    e.preventDefault()
    setHappiness(e.target.innerText)
    console.log(happiness)
  }

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

    {
      isPopup && (
        <div className='journal-form-pop-up'>
          <div className='journal-form-pop-up-card'>
            <div className='journal-pop-up-header'>
              <h3> Your journal </h3>
              <button onClick={() => setIsPopup(false)} className='journal-popup-close-btn'> x </button>
            </div>
            <form className='journal-form'>
              <textarea 
                type='text' className='journal-input-popup' 
                placeholder='How was your day today?' 
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <br/>

              <MoodSelecter handleHappinessSelect={handleHappinessSelect} isSubmit={isSubmit}/>
              {
                error && (
                  <div className='error'> {error} </div>
                )
              }
              <button type='submit' className='primary-button' onClick={handleSubmit}> Submit Journal </button>
            </form>
          </div>

        </div>
      )
    }

    </div>

  )
}

export default AddJournal