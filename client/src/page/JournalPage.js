import { useState, useEffect } from 'react'
import AddJournal from '../components/AddJournal'
import JournalDetails from '../components/JournalDetails'
import journalStyle from '../styles/journalStyle.css'

const JournalPage = () => {
  const [ journals, setJournals ] = useState([
    {
      content: 'im tired today',
      date: 'Tuesday Jul 20 2023'
    }, {
      content: 'im happy today',
      date: 'Wednesday Jul 12 2023',
    }
  ])

  const [ isPopup, setIsPopup ] = useState(false)

  const addJournal = (date, content) => {
    const newEntry = { date, content }
    setJournals([...journals, newEntry])
    console.log(journals)
  }

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await fetch('/api/journals')
      const json = await response.json()
  
      if (response.ok) {
        setJournals(json)
      }
    }

    fetchJournal()
  }, [])


  return (
    <div className='journal-page'>
      <AddJournal addJournal={addJournal}/>
      <div className='journals'>
        { journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal} className="journal-details"/>
        ))}
      </div>
    </div>
  )
}

export default JournalPage