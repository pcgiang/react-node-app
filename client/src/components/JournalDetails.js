import journalStyle from '../styles/journalStyle.css'

const JournalDetails = ({ journal }) => {
  return (
    <div className="journal-details">
      <b> { journal.createdAt } </b>
      <p className='journal-content'> { journal.content } </p>
      <div className='bottom-row'>
        <p> <strong> Mood: </strong> { journal.happiness }/5 </p>
        <div>
          <button> edit </button>
          <button> delete </button>
        </div>

      </div>
    </div>
  )
}

export default JournalDetails