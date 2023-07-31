import { useState, useEffect } from 'react'

const MoodSelecter = ({ handleHappinessSelect, isSubmit, selected }) => {
  const moodRankings = [1, 2, 3, 4, 5]

  const [ isActive, setIsActive ] = useState(selected)

  useEffect(() => {
    if (isSubmit) {
      setIsActive(null)
    }
  }, [isSubmit])

  return (
    <div>
      <div> Rank your mood below : </div>
      <div className='mood-container'>
        {
          moodRankings.map((rank) => (
            <button
              key={rank}
              className={rank === isActive ? 'mood-ranking-btn btn-active' : 'mood-ranking-btn'}
              onClick={(event) => { handleHappinessSelect(event); setIsActive(rank) } }
            > { rank } </button>
          ))
        }
      </div>
    </div>

  )
}

export default MoodSelecter