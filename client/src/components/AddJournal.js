import React from 'react'
import { useState } from 'react'
import journalStyle from '../styles/journalStyle.css'

const AddJournal = ({ addJournal }) => {
  const [ content, setContent ] = useState("")
  const [ isSubmit, setIsSubmit ] = useState(false)

  const [ isPopup, setIsPopup ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload when form is submited
    addJournal(new Date().toDateString(), content)
    setIsSubmit(true)

    setContent('')
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
              <form className='journal-form' onSubmit={handleSubmit}>
                <textarea 
                  type='text' className='journal-input-popup' 
                  placeholder='How was your day today?' 
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
                <br/>
                <button type='submit' className='primary-button'> Submit Journal </button>
              </form>
            </div>

          </div>
        )
      }

      </div>

    )
}

export default AddJournal