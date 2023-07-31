import React from 'react'
import { useState } from 'react'

const AddJournal = ({ addJournal }) => {
  const [ content, setContent ] = useState("")
  const [ isSubmit, setIsSubmit ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload when form is submited
    addJournal(new Date().toDateString(), content)
    setIsSubmit(true)

    setContent('')
  }

    return (
      <form className='JournalForm' onSubmit={handleSubmit}>
        <textarea 
          type='text' className='journal-input' 
          placeholder='How was your day today?' 
          rows={10} cols={30}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br/>
        <button type='submit' className='submit-btn'> Submit Journal </button>
      </form>
    )
}

export default AddJournal