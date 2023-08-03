import { JournalsContext } from "../context/journalsContext";
import { useContext } from "react";

export const useJournalContext = () => {
  const context = useContext(JournalsContext)

  if (!context) {
    throw Error('useJournalsContext must be used inside a JournalsContextProvider')
  }
  return context
}
