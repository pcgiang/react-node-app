import MoodSelecter from './MoodSelecter'
import { useState } from 'react'
import journalStyle from '../styles/journalStyle.css'


const JournalPopup = ({ 
  setIsPopup, 
  content, happiness, error, isSubmit,
  handleSubmit, isEdit
}) => {
  const [ _content, setContent ] = useState(content)
  const [ _happiness, setHappiness ] = useState(happiness)

  const handleHappinessSelect = (e) => {
    e.preventDefault()
    setHappiness(e.target.innerText)
    console.log(happiness)
  }

  const _handleSubmit = (event) => {
    if (!error) {
      handleSubmit(event, _content, _happiness)
      setIsPopup(false)
      if (!isEdit) {
        setContent('')
        setHappiness(null)  
      }
    } else {
      console.log(error)
    }
  }

  return (
    <div className='journal-form-pop-up'>
      <div className='journal-form-pop-up-card'>
        <div className='journal-pop-up-header'>
          <h3> Your journal </h3>
          {/* debug  */}
          <div> content: { _content }, happines: {_happiness}</div>
          <button onClick={() => setIsPopup(false)} className='journal-popup-close-btn'> x </button>
        </div>
        <form className='journal-form'>
          <textarea 
            type='text' className='journal-input-popup' 
            placeholder='How was your day today?' 
            onChange={(e) => setContent(e.target.value)}
            value={_content}
          />
          <br/>

          <MoodSelecter handleHappinessSelect={handleHappinessSelect} isSubmit={isSubmit} selected={_happiness}/>
          {
            error && (
              <div className='error'> {error} </div>
            )
          }
          <button type='submit' className='primary-button' onClick={(e) => _handleSubmit(e)}> Submit Journal </button>
        </form>
      </div>

    </div>
  )
}

export default JournalPopup