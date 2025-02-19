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
  let deckRef = database.ref('decks/decksWrapper/').push({uid: currentUser.uid})
  let deckId = deckRef.key
  database.ref('users/' + currentUser.uid + '/creations').push({realId: deckId})
  history.replace(`/deck/edit/${deckId}`)
  return (<><h1>Creating Deck...</h1></>)
}
