import { useEffect } from 'react'
import AddJournal from '../components/AddJournal'
import JournalDetails from '../components/JournalDetails'
import journalStyle from '../styles/journalStyle.css'
import { useJournalContext } from '../hooks/useJournalsContext'
import MyAlert from '../components/Alert'

const JournalPage = () => {
  const { journals, dispatch } = useJournalContext()

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await fetch('/api/journals')
      const json = await response.json()
      if (response.ok) {
        dispatch({ type : 'SET_JOURNALS', payload: json })
      }
    }
    fetchJournal()
  }, [])


  return (
    <div className='journal-page'>
      <AddJournal/>
      <div >
        { journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal} className="journal-details"/>
        ))}
      </div>
      {/* <MyAlert serverity={0} message={'this is the message '}/> */}
    </div>
  )
}

export default JournalPage