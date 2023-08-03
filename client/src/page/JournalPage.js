import { useState, useEffect } from 'react'
import AddJournal from '../components/AddJournal'
import JournalDetails from '../components/JournalDetails'
import journalStyle from '../styles/journalStyle.css'
import { useJournalContext } from '../hooks/useJournalsContext'

const JournalPage = () => {
  const { journals, dispatch } = useJournalContext()
  // const [ journals, setJournals ] = useState([])

  // const addJournal = (date, content) => {
  //   const newEntry = { date, content }
  //   // setJournals([...journals, newEntry])
  //   console.log(journals)
  // }

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await fetch('/api/journals')
      const json = await response.json()
      if (response.ok) {
        // setJournals(json)
        dispatch({ type : 'SET_JOURNALS', payload: json })
      }
    }

    fetchJournal()
  }, [])


  return (
    <div className='journal-page'>
      <AddJournal/>
      <div className='journals'>
        { journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal} className="journal-details"/>
        ))}
      </div>
    </div>
  )
}

export default JournalPage