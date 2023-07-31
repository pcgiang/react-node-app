import journalStyle from '../styles/journalStyle.css'

const JournalDetails = ({ journal }) => {
  return (
    <div className="journal-details">
      <b> { journal.createdAt } </b>
      <p> { journal.content } </p>
      <p> { journal.happiness } </p>
    </div>
  )
}

export default JournalDetails