const JournalDetails = ({ journal }) => {
  return (
    <div className="journal-details">
      <b> { journal.date } </b>
      <p> { journal.content } </p>
    </div>
  )
}

export default JournalDetails