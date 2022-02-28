import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { database } from "../firebase"
import { useHistory } from "react-router-dom"

export default function DeckEdit() {
  const { currentUser } = useAuth()
  const history = useHistory()


  if (currentUser === null) {
    return (<></>)
  }
  let deckRef = database.ref('decks/').push({uid: currentUser.uid})
  let deckId = deckRef.key
  history.replace(`/deck/edit/${deckId}`)
  return (<></>)
}
